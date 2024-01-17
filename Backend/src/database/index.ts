import mongoose from "mongoose";

export const connectAndListen = (app: any) => {
  const port = process.env.PORT || 0;
  mongoose
    .connect("mongodb://127.0.0.1:27017/img-upload")
    .then(() => {
      console.log("Successfully connected to mongodb");
      app.listen(port, () => {
        console.log("Successfully listening to port: ", port);
      });
    })
    .catch((e) =>
      console.log(
        `Unable to connect to mongodb.\nAlso, Can't listen to the port ${port}\nERROR: `,
        e
      )
    );
};
