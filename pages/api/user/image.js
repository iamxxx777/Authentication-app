import connectDB from "../../../config/connectDB";
import cloudinaryV from '../../../config/cloudinary';
import upload from '../../../config/multer';
import Users from "../../../models/user";
import nextConnect from "next-connect";
import { getSession } from "next-auth/client";


connectDB();


const apiRoute = nextConnect({
  onError(error, req, res) {
      res.status(501).json({error: `Sorry, there was an error! ${error.msg}`});
  },
  onNoMatch(req, res) {
      res.status(405).json({error: `Method '${req.method}' is not allowed`})
  }
});

apiRoute.use(upload.single("image"));


apiRoute.put(async (req, res) => {
    
    try {

        const session = await getSession({ req });
        const id = session.user.id;

        const user = await Users.findById(id);

        if(!user) {
          res.status(200).json({error: "User does not exist"});
        }

        var data = {};

        if(req.file) {
            if (session.user.cloudId) {
              // delete former image from the cloudbase
              await cloudinaryV.uploader.destroy(session.user.cloudId);
            }

            const result = await cloudinaryV.uploader.upload(req.file.path);

            if (result.secure_url) {
                data.image = result.secure_url;
                data.cloudId = result.public_id;
            }
        }

        Users.findByIdAndUpdate(id, {image: data.image, cloudId: data.cloudId}, {new: true}, (err, doc) => {
              if(err) {
                  console.error(err);
                  res.status(500).json({error: "Server Error"});
              } else {
                  res.json({success: true});
              }
        });

    } catch (error) {
        res.status(500).json(error);
    }
});




export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}; 