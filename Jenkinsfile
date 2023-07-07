
pipeline{
  agent any
  stages{
    stage('delete old containers'){
      steps{
        sh 'docker stop TaskSpring || true'
        sh 'docker rm TaskSpring || true'
        sh 'docker stop TaskAngular || true'
        sh 'docker rm TaskAngular || true'
        sh 'docker network rm -f TaskNetwork || true'
      }
    }
    stage('build spring'){
      steps{
        sh 'docker build -t spring-task ./backend/'
      }
    } 
    stage('build angular'){
        steps{
          sh 'docker build -t angular-task ./frontend/'
        }
      }
    stage('create network'){
      steps{
              sh 'docker network create TaskNetwork || true'
      }
    }
     stage('deploy spring'){
      steps {
        sh 'docker run -d --network TaskNetwork -p 8080:8080 --name TaskSpring spring-task'
      }
    }
    stage('deploy angular'){
      steps{
        sh ' docker run -d --network TaskNetwork -p 4200:80 --name TaskAngular angular-task'
      }
    }
  }
}
