pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_ACCOUNT_ID        = credentials('AWS_ACCOUNT_ID')
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
        stage('Test HTTP Endpoints') {
            steps {
                dir('server') {
                    sh 'npm install'
                    sh 'npm start & echo $! > server.pid'
                }
                script {
                    def isRunning = false
                    def maxRetries = 10 
                    def attempts = 0
    
                    while (!isRunning && attempts < maxRetries) {
                        def process = sh(script: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/', returnStdout: true).trim()
                        if (process == "200") {
                            isRunning = true
                            echo "Server is up and running!"
                        } else {
                            echo "Server not ready yet, retrying in 2 seconds..."
                            sleep 2
                        }
                        attempts++
                    }
                    
                    if (!isRunning) {
                        error "Server did not start within expected time!"
                    }
                }

                sh 'npm install -g httpyac'
                sh 'httpyac test.http'

                dir('server') {
                    sh 'kill $(cat server.pid)'
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
                aws ecr get-login-password --region eu-central-1 | docker login --username AWS https://${env.AWS_ACCOUNT_ID}.dkr.ecr.eu-central-1.amazonaws.com -p \$(aws ecr get-login-password --region eu-central-1)

                # Tag the Docker image with the ECR repository URL
                docker tag employee-madness:${env.BUILD_ID} ${env.AWS_ACCOUNT_ID}.dkr.ecr.eu-central-1.amazonaws.com/employee-madness:${env.BUILD_ID}

                # Push the Docker image to ECR
                docker push ${env.AWS_ACCOUNT_ID}.dkr.ecr.eu-central-1.amazonaws.com/employee-madness:${env.BUILD_ID}
                """                  
            }
        }
    }
}