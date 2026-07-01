pipeline {
    agent any

    tools {
        allure 'Allure'  // Must match name in Jenkins Global Tool Configuration
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install all npm packages including allure-playwright
                bat 'npm install'
                // Install Playwright browsers
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run @Web tagged tests with allure-playwright reporter
                bat 'npm run WebTest'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                // Run @Regression tagged Cucumber tests and generate HTML report
                bat 'npm run Cucumber'
            }
        }
    }

    post {
        always {
            // Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS',
                report: 'allure-report'
            ])

            // Publish Cucumber HTML Report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber HTML Report'
            ])
        }
    }
}
