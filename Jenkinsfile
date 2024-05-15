pipeline{
    agent any
    stages{
        stage("Stage 1: Code from GitHub") {
            steps {
                git branch: 'main', url: 'https://github.com/SandyUndefined/CCA.git'
            }
        }
        stage("Stage 2: Deploy using Docker compose"){
            steps{
                sh "docker-compose up -d"
            }
        }
    }
}
