import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import cors from "cors";
import db from "./config.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;
const saltRounds = 10;
app.use(cors());
app.use(express.json());

db.connect()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is up and running at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err.message);
  });

//                                      Routes:
// Fetching all data from resp tables:
app.get("/personalInfo/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM RESUME_PERSONAL_INFO");
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});
app.get("/experience/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM RESUME_EXPERIENCE");
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});
app.get("/education/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM RESUME_EDUCATION");
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});
app.get("/skill/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM RESUME_SKILLS");
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

// Forgot Password:
app.get("/:email", async (req, res) => {
  // OTP Generator Function :
  const otpGenerator = () => {
    let otp = Math.floor(100000 + Math.random() * 900000); // base 6 digit value is 100k
    return otp.toString();
  };
  const email = req.params["email"];
  const otp = otpGenerator();
  try {
    const data = await db.query("SELECT * FROM REGISTRATION WHERE EMAIL = $1", [
      email,
    ]);
    if (data.rowCount == 1) {
      // Setting up Node Mailer :
      let transporter = nodemailer.createTransport({
        service: process.env.AUTH_SERVICE,
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS,
        },
      });
      var mailOptions = {
        from: process.env.AUTH_USER,
        to: `${email}`,
        subject: "One Time Password (OTP Code) from Resume Builder App",
        text: `Warm Greetings,\nYour OTP Code is ${otp}.Thank you for using our application.\n-Shamim Ahamed.S `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({
            text: "An Email has been sent to the g-mail. Kindly Enter your 6 digit code.",
            otp: otp,
          });
        }
      });
    } else {
      res.send({ text: "The Email has not been registered.", otp: null });
    }
  } catch (err) {
    console.log(err);
  }
});

// Logging in:
app.get("/:email/:password", async (req, res) => {
  try {
    const email = req.params["email"];
    const password = req.params["password"];

    const data = await db.query("SELECT * FROM REGISTRATION WHERE EMAIL = $1", [
      email,
    ]);
    if (data.rowCount == 1) {
      const hash = data.rows[0].password;
      const regID = data.rows[0].registration_id;
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          console.error("Error comparing", err);
        } else {
          if (result) {
            const token = jwt.sign(
              {
                Id: data.id,
                Email: data.email,
              },
              process.env.JWT_KEY,
              { expiresIn: "1h" },
            );
            res.send({
              text: "User Validated",
              Token: token,
              regsitrationId: regID,
            });
          } else {
            res.send({
              text: "Invalid Credentials",
            });
          }
        }
      });
    } else {
      res.send({
        text: "There is no user with the above email id.Please re-check your email id or register below",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//                                      AUTH ROUTES
// Registering a user:
app.post("/", async (req, res) => {
  console.log("req fired");
  const registrationId = uuid(); // Generate a unique ID...
  const { name, email, password } = req.body;
  // Check if the user has already registered.
  const data = await db.query("SELECT * FROM REGISTRATION WHERE EMAIL = $1", [
    email,
  ]);
  if (data.rowCount > 0) {
    res.send({
      text: "A user has already been registered using that email address.If that's you try logging in else kindly use another email address.",
    });
  } else {
    try {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          await db
            .query(
              "INSERT INTO REGISTRATION(name,email,password,registration_id) VALUES ($1,$2,$3,$4)",
              [name, email, hash, registrationId],
            )
            .then(
              res.send({
                text: "Registration Success",
                regID: registrationId,
              }),
            );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// OTP Verification
app.post("/verifyOtp", async (req, res) => {
  const mailGeneratedOTP = req.body["mailGeneratedOTP"];
  const userGeneratedOTP = req.body["userGeneratedOTP"];
  if (mailGeneratedOTP === userGeneratedOTP) {
    res.send("Successful OTP Validation.");
  } else {
    res.send({
      text: "Wrong OTP.Another Email has been sent to the g-mail. Kindly Enter your 6 digit code.",
    });
  }
});
// Change of Password:
app.post("/changePassword", async (req, res) => {
  const newPassword = req.body["newPassword"];
  const email = req.body["Email"];
  const saltRounds = 10;
  try {
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
      await db
        .query("UPDATE REGISTRATION SET PASSWORD = $1 WHERE EMAIL = $2", [
          hash,
          email,
        ])
        .then(res.send("Password Changed Successfully"));
    });
  } catch (error) {
    console.log(error);
  }
});
//                            CREATION OF RESUME
// Registering Experience:
app.post("/experience", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO RESUME_EXPERIENCE(POSITION,COMPANY,START_DATE,END_DATE,JOB_DESC,RESUME_ID,REGISTRATION_ID) VALUES($1,$2,$3,$4,$5,$6,$7) ",
      [
        req.body.Position,
        req.body.Company,
        req.body.Start,
        req.body.End,
        req.body.Description,
        req.body.Id,
        req.body.Registration_Id,
      ],
    );
    res.send({
      text: "Data inserted successfully",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/experience/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    await db.query("DELETE FROM RESUME_EXPERIENCE WHERE ID=$1", [id]);
    res.send("Successfully Deleted.");
  } catch (error) {
    console.log(error);
  }
});
// Registering Education :
app.post("/education", async (req, res) => {
  console.log(req.body);
  try {
    await db.query(
      "INSERT INTO RESUME_EDUCATION(COURSE,INSTITUTE,START_DATE,END_DATE,RESUME_ID,REGISTRATION_ID) VALUES($1,$2,$3,$4,$5,$6)",
      [
        req.body.Course,
        req.body.Board,
        req.body.startDate,
        req.body.endDate,
        req.body.Id,
        req.body.Registration_Id,
      ],
    );
    res.send({
      text: "Successfully Inserted",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
});
// Deleting Education:
app.delete("/education/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    await db.query("DELETE FROM RESUME_EDUCATION WHERE ID=$1", [id]);
    res.send("Successfully Deleted.");
  } catch (error) {
    console.log(error);
  }
});
// Registering Skill
app.post("/skill", async (req, res) => {
  try {
    const response = await db.query(
      "INSERT INTO RESUME_SKILLS(SKILL,RESUME_ID,REGISTRATION_ID) VALUES($1,$2,$3)",
      [req.body.Skill, req.body.Id, req.body.Registration_Id],
    );
    res.send({
      text: "Successfully inserted.",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
  }
});
// Deleting Skill
app.delete("/skill/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM RESUME_SKILLS WHERE ID=$1", [id]);
    res.send("Data deleted successfully");
  } catch (error) {
    console.log(error);
  }
});
// Registering Personal Info:
app.post("/personalInfo", async (req, res) => {
  console.log(req.body);
  try {
    const response = await db.query(
      "INSERT INTO RESUME_PERSONAL_INFO(NAME,EMAIL,MOBILE_NO,DOB,GENDER,RELIGION,NATIONALITY,MARITAL_STATUS,HOBBIES,LANGUAGES_KNOWN,ADDRESS,TITLE,RESUME_ID,REGISTRATION_ID) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
      [
        req.body["Name"],
        req.body["Email"],
        req.body["Mobile"],
        req.body["DOB"],
        req.body["Gender"],
        req.body["Religion"],
        req.body["Nationality"],
        req.body["Marital_Status"],
        req.body["Hobbies"],
        req.body["Languages"],
        req.body["Address"],
        req.body["Title"],
        req.body["Id"],
        req.body["Registration_Id"],
      ],
    );
    res.send("Data inserted Successfully");
  } catch (error) {
    console.log(error);
  }
});
app.post("/profileUpdate", async (req, res) => {
  try {
    const name = req.body.newName;
    const email = req.body.newEmail;
    const data = await db.query("SELECT * FROM REGISTRATION WHERE NAME= $1", [
      name,
    ]);
    console.log(data.rowCount);
    if (data.rowCount == 1) {
      await db.query("UPDATE REGISTRATION SET EMAIL=$1 WHERE NAME=$2", [
        email,
        name,
      ]);
      res.send({
        text: "Profile Updated Successfully",
      });
    } else {
      res.send({
        text: "Kindly enter the name used for registration.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// Deletion of Resume in homePage:
app.delete("/personalData/:resumeId", async (req, res) => {
  const resumeId = req.params.resumeId;
  try {
    await db.query("DELETE FROM RESUME_PERSONAL_INFO WHERE RESUME_ID =$1", [
      resumeId,
    ]);
    res.send("Successfully Deleted.");
  } catch (error) {
    console.log(error);
  }
});
app.delete("/experienceData/:resumeId", async (req, res) => {
  const resumeId = req.params.resumeId;
  try {
    await db.query("DELETE FROM RESUME_EXPERIENCE WHERE RESUME_ID =$1", [
      resumeId,
    ]);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/educationData/:resumeId", async (req, res) => {
  const resumeId = req.params.resumeId;
  try {
    await db.query("DELETE FROM RESUME_EDUCATION WHERE RESUME_ID =$1", [
      resumeId,
    ]);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/skillData/:resumeId", async (req, res) => {
  const resumeId = req.params.resumeId;
  try {
    await db.query("DELETE FROM RESUME_SKILLS WHERE RESUME_ID =$1", [resumeId]);
  } catch (error) {
    console.log(error);
  }
});

// Editing Routes:
app.patch("/personalInfo", async (req, res) => {
  try {
    await db.query(
      "UPDATE RESUME_PERSONAL_INFO SET NAME=$1,EMAIL=$2,MOBILE_NO=$3,DOB=$4,GENDER=$5,RELIGION=$6,NATIONALITY=$7,MARITAL_STATUS=$8,HOBBIES=$9,LANGUAGES_KNOWN=$10,ADDRESS=$11,TITLE=$12 WHERE RESUME_ID =$13",
      [
        req.body.Name,
        req.body.Email,
        req.body.Mobile,
        req.body.DOB,
        req.body.Gender,
        req.body.Religion,
        req.body.Nationality,
        req.body.Marital_Status,
        req.body.Hobbies,
        req.body.Languages,
        req.body.Address,
        req.body.Title,
        req.body.Id,
      ],
    );
  } catch (error) {
    console.log(error);
  }
});
