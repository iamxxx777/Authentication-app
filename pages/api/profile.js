import connectDB from "../../config/connectDB";
import User from "../../models/user";

connectDB();

export default async (req, res) => {
  const { method } = req;
  const data = req.body;

  switch (method) {
      case 'PUT': {
        const { id } = req.body;
          try {
              const user = await User.findById(id);

              if(!user) {
                res.status(200).json({error: "User does not exist"});
              }

              const { id, ...others } = data;

              User.findByIdAndUpdate(id, {$set: others}, {new: true}, (err, doc) => {
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
      }

  }
}
