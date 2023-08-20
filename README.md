# Upload Images to Cloudinary and MongoDB

***Objective***

This tutorial will teach you how to upload images to Cloudinary using their API while also adding the `imageUrl` and `publicId` strings to a new document in your MongoDB Database

---

## Part 1 - Cloudinary Account and Backend

- Create a Cloudinary account by clicking on this link: https://cloudinary.com/users/register_free
- Once you've created an account and logged in, you should be redirected to the **Getting Started** page. Click on **Dashboard** on the left Navbar to view your sensitive API information. You will need this information for your `.env` file in the Backend. If **Dashboard** does not show up, click on **Transformations** which is also on the left Navbar, then **Dashboard** should show up.


<img width="1462" alt="68747470733a2f2f6d656469612e6769742e67656e6572616c617373656d622e6c792f757365722f34383833332f66696c65732f62376430616163382d656333612d343362392d613563622d623530393434363037613661" src="https://github.com/aralhibshi/tutorial-cloudinary/assets/118065642/6150ac85-7065-46ec-9dfa-458bef896033">
<img width="1469" alt="Cloudinary2" src="https://media.git.generalassemb.ly/user/48833/files/f08b9ef6-6a76-4216-a010-b5dd7d4e5119">

---
- Install all the dependencies in the Backend and Frontend of your app
    - In VS Code, `cd` into your Backend app folder and run `npm i cloudinary cors dotenv express express-session mongoose multer`. You may have one or more of these dependencies already installed so skip them if you do.
    - `cd` into your Frontend app folder and run `npm i axios`
---
- Require and initliaze certain dependencies in the `server.js` file of the Backend folder. View the `server.js` file in the repo to clarify
- Create the neccessary folders
    - Create a separate `middelware` and `services` folder in the root of your Backend folder. We'll be using this structure for this functionality to keep the `server.js` file a bit more tidy.
---
- Create the neccessary files and code, *view the repo files for guidance and comments*
    - In the `middelware` folder, create a file called `upload.js`,  this file will require and setup the multer dependency.
    - In the `services` folder, create a file called `cloudinary.js`, this file will require the cloudinary dependency, configure it and define a function called `uploadToCloudinary()` which we will use later.
    - In the `models` folder, create a filed called `Image.js`, the schema of this model will contain a `publicId` and an `imageUrl`
    - In the `routes` folder, create a file called `image.js`, this will be a regular router structure along with some functionality of a controller for the POST Method. This is also where you will require the `uploadToCloudinary()` function which we defined in `clourdinary.js`
    - In the root of your Backend app, create a `.env` file (if you don't already have one).
     - Since a `.env` file is not uploaded to this repo, I have provided the basic code required. You will need to replace the values with your own sensitive information. Your cloudinary information is available to you on the Cloudinary Dashboard page.
     
        
            # MongoDB
            PORT=ANYPORTNUMBER
            mongoDBURL=YOURMONGODBURL
            SECRET=ANYSECRET

            # Cloudinary
            CLOUD_NAME = YOURCLOUDNAME
            API_KEY = YOURAPIKEY
            API_SECRET = YOURAPISECRET
        
- At this point, you could have a very similar file/folder structure and code, the real difference in our code may come in the Frontend. If you have any problems so far, make sure you look up the files and folders in the repo and read the comments to gain a better understanding as this README only provides basic guidance.
---
- Start testing your API in Postman (preferably)

<img width="1470" alt="Postman" src="https://media.git.generalassemb.ly/user/48833/files/bc412df6-355b-47e3-b392-9d800b8d0565">

  - Create and name your HTTP Request: `POST IMAGE CREATE API`
  - Add the URL: `http://localhost:YOURPORTNUMBER/image/upload`
  - Use your port number (e.g. 4000), you may have to change the route if you named it something else
  - Set the HTTP Method to `POST`
  - Select `Body` in the Navbar below the URL
  - Select `form-data` below the previous Navbar
  - Add an `image` key and set it to `file` instead of `text` (this option will be to the right of `image`)
  - Select an image to upload and send the HTTP request, you should receive a success message in the Postman response window
  - Check your Database for a new image document and your Cloudinary Media Library for a new file
- Backend is done!

---

## Part 2 - Frontend

*There are many ways of doing this but on a basic level, you could follow these steps.*

- In your `src` folder, create an `upload` folder and add an `UploadImage.js` component (you can use `.jsx` if you want but stick to one format throughout your whole project)
- Import the new component into your parent component, in my case I imported it to `App.jsx`.
- Render your `UploadImage.js` in your the `return` section of your parent component (Again, `App.jsx` for me)
- Import Axios into your `UploadImage.js` component
- Define a `handleSelectFile()` function, a `handleUpload()` function, some states for them to use and start coding.
    - Read about the multer dependency, it uses req.file, req.files, req.file.length, etc.
- In the `return` section of your component, make sure your `input` tag matches the input tag has these attributes: `type='file'` and `onChange={handleSelectFile}`.
- In the `return` section, make sure your `button` tag calls the `handleUpload()` function during `onClick`

**That's it B) Remember to view this repo as guidance and research whatever you find confusing. The rest is up to you! Good luck with your projects and remember to take breaks!**
