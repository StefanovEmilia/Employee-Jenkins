pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_ACCOUNT_ID        = credentials('AWS_ACCOUNT_ID')
        AWS_REGION            = credentials('AWS_REGION')
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
                    aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com

                    # Tag the Docker image with the ECR repository URL
                    docker tag employee-madness:"$BUILD_ID" "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/employee-madness:"$BUILD_ID"

                    # Push the Docker image to ECR
                    docker push "$AWS_ACCOUNT_ID".dkr.ecr."$AWS_REGION".amazonaws.com/employee-madness:"$BUILD_ID"
                    """    
            }
        }
    }
}