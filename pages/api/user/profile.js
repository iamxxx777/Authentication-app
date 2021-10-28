import connectDB from "../../../config/connectDB";
import Users from "../../../models/user";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/client";

connectDB();


export default async (req, res) => {
    const { method } = req;

    switch (method) {  
      case 'GET': {
          try {
              const session = await getSession({ req });

              if(!session) {
                res.status(401).json({err: "User not authenticated"});
              }

              const id = session.user.id;

              const user = await Users.findById(id);

              res.json({success: true, user});
          } catch (error) {
              res.status(500).json({err: error.message});
          }
          
      }
      break;

      case 'PUT': {
          const data = req.body;

          try {
              const user = await Users.findById(data.id);

              if(!user) {
                res.status(200).json({error: "User does not exist"});
              }

              var { id, ...others } = data;

              if (data.password) {
                  let salt = await bcrypt.genSalt(10);
                  const hashedPassword = await bcrypt.hash(password, salt);
                  others.password = hashedPassword;
              } else {
                  delete others.password;
              }

              Users.findByIdAndUpdate(id, {$set: others}, {new: true}, (err, doc) => {
                    if(err) {
                        console.error(err);
                        res.status(500).json({error: "Server Error"});
                    } else {
                        res.json({success: true});
                    }
                });
          } catch (error) {
            res.status(500).json({error: error.message});
          }
      }
      break;
      default:
            res.status(400).json({ error: "this requested method is not allowed" });
            break;
  }
}
