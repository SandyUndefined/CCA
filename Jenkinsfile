pipeline{
    agent any
    stages{
        stage("Stage 1: Code from GitHub") {
            steps {
                git branch: 'main', url: 'https://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@github.com/SandyUndefined/CCA.git'
            }
        }
        stage("Stage 2: Deploy using Docker compose"){
            steps{
                sh "docker-compose up -d"
            }
        }
    }
}
