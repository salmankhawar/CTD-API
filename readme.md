# Welcome to the product shop API

This is a simple API made with Expressjs and Sendgrid
Sendgrid is used to send out of stock emails

# Step by step instructions to setup in local environment

** Note: Make sure you have your database setup on Mongodb and your Send Grid account setup with verified email 

1. Clone repo and save it on your computer in a separate folder
2. Open root folder with Visual Studio Code
3. Run the following command: 
### `npm i`
4. Create a .env file in the root folder and add the following environment variables: 
i. MONGODB_URL= "Your Mongodb URL"
ii. SENDGRID_API_KEY= "Your SendGrid API Key, Note: Add '' for local deployment otherwise it says invalid key"
iii. MY_EMAIL= "The email you want the stock out emails to be sent to"
iv. SENDER_EMAIL= "Your Send Grid verified email"

## Once all the above steps are complete run the following command and your api will start running on the first available port, if there's no other local API running the port will be `http://localhost:4000`

### `npm start`

**Note this api is configured to run with the following react app, deploy on your local environment to run the complete fullstack app. 

`https://github.com/salmankhawar/CTD-React`

Additional Links:
1. MongoDB: `https://www.mongodb.com/`
2. SendGrid: `https://sendgrid.com/`