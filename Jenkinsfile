pipeline {
    agent {
        docker { image 'node:16' }
    }

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_ACCOUNT_ID        = credentials('AWS_ACCOUNT_ID')
        AWS_REGION            = credentials('AWS_REGION')
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
                    aws ecr get-login-password --region ${env.AWS_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com

                    # Tag the Docker image with the ECR repository URL
                    docker tag employee-madness:${BUILD_ID} ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com/employee-madness:${BUILD_ID}

                    # Push the Docker image to ECR
                    docker push ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com/employee-madness:${env.BUILD_ID}
                    """    
            }
        }
    }
}