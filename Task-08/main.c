#include <stdio.h>
#include <string.h>
#include <sys/wait.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>


pid_t bg_pids[100]; 
int bg_count = 0;

void handle_sigchld(int sig) {
    pid_t pid;
    while ((pid = waitpid(-1, NULL, WNOHANG)) > 0) {
        for (int i = 0; i < bg_count; i++) {
            if (bg_pids[i] == pid) {
                bg_pids[i] = 0; 
                break;
            }
        }
    }
}


void handle_sigint(int sig) {
    if(bg_count == 0){
        printf("None");
    } else {
        printf("\n");
        for (int j = 0 ; j < bg_count ; j++){
            printf("PIDS : %d\n",bg_pids[j]);
        }
    }
    printf("unix-shell > ");
    fflush(stdout); 
}

void handle_sigtstp(int signum){
    printf("\n");
    printf("unix-shell > ");
    fflush(stdout);
}

int main() {
    char input[100];
    char *args[10];

    signal(SIGTSTP, handle_sigtstp);
    signal(SIGINT, handle_sigint);
    signal(SIGCHLD, handle_sigchld);

    while (1) {
        
        printf("unix-shell > "); 
        if (fgets(input,sizeof(input),stdin) == NULL){
            printf("Unexpected Error Occured ");
            break;
        }

        input[strcspn(input,"\n")] = 0;

        int i = 0;
        char *token = strtok(input, " ");
        while (token != NULL){
            args[i] = token;
            i++;
            token = strtok(NULL , " ");
        } 
        
        args[i] = NULL;
        if(args[0] == NULL){
            printf("No Command Given !\n");
            continue;
        }  
        
        if(strcmp(args[0], "exit") == 0){
            printf("Goodbye :) \n");
            break;
        }

        int background = 0;
        if(i > 0 && strcmp(args[i-1], "&") == 0 ){
            background = 1;
            args[i-1] = NULL;
        } else {
            background = 0;
        }

        if (strcmp(args[0], "cd") == 0) {
            if (args[1] == NULL) {
                chdir(getenv("HOME"));
            } else {
                if (chdir(args[1]) != 0) {
                    perror("cd failed");
                }
            }
            continue; 
        }

        if (strcmp(args[0], "pwd") == 0) {
            char cwd[4096];
            if (getcwd(cwd, sizeof(cwd)) != NULL) {
                printf("%s\n", cwd);
            } else {
                perror("pwd failed");
                continue;
            } 
            continue;
        }

        pid_t parll_procc = fork();        
        if (parll_procc == 0){
            if(execvp(args[0],args) == -1){
                perror("Command Execution Failed");
            }
            exit(1);
        } else {
            if (background) {
                bg_pids[bg_count] = parll_procc;
                bg_count++;
                printf("Background process started with PID : %d\n", parll_procc);
            } else {
                waitpid(parll_procc, NULL, 0);
            }          

        }
    }

    return 0;
}