pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }

    tools {
        nodejs 'NodeJs'
        dockerTool 'Docker'
    }

    stages {
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('server') {
                    sh "docker build -t employee-madness:${env.BUILD_ID} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                 sh """
                    # Authenticate Docker to AWS ECR
                    aws ecr get-login-password --region eu-central-1 | docker login --username AWS https://794038210581.dkr.ecr.eu-central-1.amazonaws.com -p $(aws ecr get-login-password --region eu-central-1)

                    # Tag the Docker image with the ECR repository URL
                    docker tag employee-madness:"${env.BUILD_ID}" 794038210581.dkr.ecr.eu-central-1.amazonaws.com/employee-madness:"${env.BUILD_ID}"

                    # Push the Docker image to ECR
                    docker push 794038210581.dkr.ecr.eu-central-1.amazonaws.com/employee-madness:"${env.BUILD_ID}"
                    """    
            }
        }
    }
}