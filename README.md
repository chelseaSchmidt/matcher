# Matcher
An open-source single page web application in development to automate bank reconciliations for accountants, as well as individuals who keep a personal budget and need to fix discrepancies between their budget and the bank.

## System requirements
  - Node 10.20.1
  - npm package manager
  - MongoDB 4.2.7
  - To start in development mode: Nodemon 2.0.4

## Run the application
  - npm install
  - npm run build:prod || npm run watch:dev
  - npm run start:prod || npm run start:dev
    - Optional environment variable: PORT (defaults to 3000)

## API
###### To create a new reconciliation from source files:
  - Endpoint: /files
  - Method: POST
  - Data: FormData object appended with the following:
    - Two CSV files in a 'sourceFiles' array
      - Format within each CSV is currently unconstrained, but in order for files to be read properly, the bank file must have 8 new lines above the first row of transactional data, and the book file must have 1 new line above the first row of transactional data
    - Ending book balance number called 'endBook'
    - Ending bank balance number called 'endBank'
    - Reconciliation name string called 'bankName'
    - See the Uploader component in client/src/components for an example
  - Headers: { 'Content-Type' : 'multipart/form-data' }
  - Success response:
    - Condition: Two CSV files, a reconciliation name, and two ending balance numbers were included in submitted form data
    - Status code: 201 CREATED
    - Content: N/A
  - Error response:
    - Condition: Missing information
    - Status code: 400 BAD REQUEST

###### To retrieve the most recently created reconciliation:
  - Endpoint: /last-recon
  - Method: GET
  - Data: {}
  - Success response:
    - Condition: At least one reconciliation is present in the database
    - Status code: 200 OK
    - Content: JSON object with reconciliation data
  - Error response:
    - Condition: No reconciliations exist
    - Status code: 404 NOT FOUND
    - Content: N/A

###### To retrieve all previously created reconciliations:
  - Endpoint: /recons
  - Method: GET
  - Data {}
  - Success response:
    - Condition: At least one reconciliation is present in the database
    - Status code: 200 OK
    - Content: Array of JSON objects each with reconciliation information
  - Error response:
    - Condition: No reconciliations exist
    - Status code: 404 NOT FOUND
    - Content: N/A

###### To mark a specific transaction within a reconciliation object as incorrect:
  - Endpoint: /incorrect-transaction/:id
  - Method: PATCH
  - Data: { isIncorrect: true || false, type: 'book' || 'bank' }
  - Success response:
    - Condition: Targeted transaction within a reconciliation was found and updated
    - Status code: 200 OK
    - Content: Modified JSON reconciliation object

###### To mark a specific transaction within a reconciliation object as having a date out of range:
  - Endpoint: /cutoff-transaction/:id
  - Method: PATCH
  - Data: { isCutoff: true || false, type: 'book' || 'bank' }
  - Success response:
    - Condition: Targeted transaction within a reconciliation was found and updated
    - Status code: 200 OK
    - Content: Modified JSON reconciliation object
