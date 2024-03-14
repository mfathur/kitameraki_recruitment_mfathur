# Kitameraki Technical Test

### Prerequisite:
- yarn to run the frontend app
- npm to run the backend app
- Node with version `>12.22.9`

### How to run:
1. Clone the repo.
2. Create `.env` file in `backend` and `frontend` folder.
3. Copy the code below to `.env` file in backend app.
   ```
   NODE_ENV = development
   ```
4. Copy the code below to `.env` file in frontend app.
   ```
   AXIOS_BASE_URL=http://localhost:3000
   ```
5. Install backend app dependencies by command `npm install`.Ensure that your current directory is in the `backend` folder.
6. Run the backend app by command `npm run dev`. 
7. Install frontend app dependencies by command `yarn`.Ensure that your current directory is in the `frontend` folder.
8. Run the frontend app by command `yarn dev`. 
9. That's it. The whole app is already running. You can access it with your local browser by visiting http://localhost:5173.
