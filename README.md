# Upload Images to Cloudinary and MongoDB

A tutorial I wrote in 2023 as an Associate Instructor at General Assembly, for students on the Software Engineering
Immersive course. It shows how to add image uploads to an Express and MongoDB app: files go to Cloudinary, and each
image's URL and public ID are saved in MongoDB. It was optional, and some students used it in their projects.

The repo has a working example to follow along with: an Express backend in [`cloudinary-be`](cloudinary-be) and a
React frontend in [`cloudinary-fe`](cloudinary-fe). The code is commented to explain each step. More about my work is
on my [portfolio](https://ahmedalhibshi.dev).

**Stack:** Node.js, Express, MongoDB, Mongoose, Multer, Cloudinary, React, Axios.

---

## Part 1: Cloudinary account and backend

### Create a Cloudinary account

Sign up for a free account at [cloudinary.com](https://cloudinary.com/users/register_free). Once you're logged in,
find your **cloud name**, **API key** and **API secret**. You'll need them for your backend's `.env` file.

<img width="1462" alt="The Cloudinary dashboard, showing the cloud name, API key and API secret" src="https://github.com/aralhibshi/tutorial-cloudinary/assets/118065642/6150ac85-7065-46ec-9dfa-458bef896033">

> Cloudinary's console has changed since this tutorial was written. If your keys aren't on the dashboard, look under
> **Settings → API Keys**.

### Install the dependencies

In your backend folder:

```bash
npm i cloudinary cors dotenv express mongoose multer
```

In your frontend folder:

```bash
npm i axios
```

Skip any you already have.

### Add the files

Use the files in [`cloudinary-be`](cloudinary-be) as a guide, and read the comments in each one.

| File                                                                 | What it does                                                                   |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`server.js`](cloudinary-be/server.js)                               | Sets up Express, CORS and dotenv, connects to MongoDB and mounts the routes    |
| [`middleware/upload.js`](cloudinary-be/middleware/upload.js)         | Sets up Multer, which reads the uploaded files from the request                |
| [`services/cloudinary.js`](cloudinary-be/services/cloudinary.js)     | Configures Cloudinary and defines `uploadToCloudinary()`                       |
| [`models/Image.js`](cloudinary-be/models/Image.js)                   | An `Image` model with an `imageUrl` and a `publicId`                           |
| [`routes/image.js`](cloudinary-be/routes/image.js)                   | A `POST /image/upload` route that uploads each file and saves it to MongoDB    |

Keeping Multer and Cloudinary in their own `middleware` and `services` folders keeps `server.js` tidy.

### Add your environment variables

Create a `.env` file in the root of your backend, and replace the values with your own:

```bash
# MongoDB
PORT=4001
mongoDBURL=YOUR_MONGODB_URL

# Cloudinary
CLOUD_NAME=YOUR_CLOUD_NAME
API_KEY=YOUR_API_KEY
API_SECRET=YOUR_API_SECRET
```

> Make sure `.env` is in your `.gitignore` so your keys never end up on GitHub.

### Test it in Postman

1. Create a `POST` request to `http://localhost:4001/image/upload` (use your own port, and your own route if you
   named it differently).
2. Under **Body**, select **form-data**.
3. Add a key called `image`, change its type from **Text** to **File**, and choose an image.
4. Send the request. You should get a success message back.
5. Check your database for a new image document, and your Cloudinary **Media Library** for the new file.

The backend is done!

---

## Part 2: Frontend

There are many ways to do this. Here's a simple one, based on
[`UploadImage.jsx`](cloudinary-fe/src/upload/UploadImage.jsx):

1. In your `src` folder, create an `upload` folder with an `UploadImage.jsx` component, and render it from a parent
   component (`App.jsx` here). Use `.js` or `.jsx`, but stick to one across your project.
2. Import Axios into the component.
3. Add some state, a `handleSelectFile()` function that stores the selected files, and a `handleUpload()` function
   that adds them to a `FormData` object and posts it to your backend.
4. Give your `input` tag `type="file"` and `onChange={handleSelectFile}`. Add `multiple` if you want to upload more
   than one file at a time.
5. Give your `button` tag `onClick={handleUpload}`.

Multer puts a single uploaded file on `req.file` and several on `req.files`, so read up on it if your backend needs
to handle them differently.

**That's it B) Use this repo as a guide, and look up anything you find confusing. The rest is up to you. Good luck
with your projects, and remember to take breaks!**
