import connectDB from "../../config/connectDB";
import Users from "../../models/user";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
      case 'POST': {
        const { email, password } = req.body;

        try {
          let user = await Users.findOne({email});

          if(!user) {
            let salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const newUser = new Users({email: email, password: hashedPassword});
        
            await newUser.save();
  
            return user = newUser;
  
          } else {
              if(!user.password) {
                throw new Error("You are not registered, please create an account");
              }
          
              const validated = await bcrypt.compare(password, user.password);
          
              if(!validated) {
                  throw new Error("Password incorrect");
              }
      
              return user;
          }
        } catch (error) {
            res.status(500).json(error);
        }
  
      }
      break;
      case 'PUT': {
          const data = req.body;
          try {
              const user = await User.findById(data.id);

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
      break;
      default:
            res.status(400).json({ error: "this requested method is not allowed" });
            break;
  }
}
