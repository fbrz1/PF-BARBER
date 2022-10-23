const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { User } = require("../db");
const { promisify } = require("util");
const Swal = require("sweetalert2");
const { getDBUsers } = require("../middlewares/getAllUsers");
const { transporter } = require("../../configs/mailer");
//procedimiento para registrarnos
exports.register = async (req, res) => {
  const { name, lastname, email, phone, user, password } = req.body;

  try {
    if (!name || !lastname || !email || !phone || !user || !password) {
      return res.status(404).send("Must complete all fields");
    } else {
      let passHash = await bcryptjs.hash(req.body.password, 8);
      await User.create({
        user: req.body.user,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: passHash,
        phone: req.body.phone,
      })
        .then((user) => {
          console.log(user);
          if (!user) {
            return res.status(404);
          } else {
            sendEmail(req.body.email);
            res.send(
              "Congratulations, your account has been succesfully created!"
            );
            // res.redirect("/");
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send(`Username or Email is already register`);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

exports.login = async (req, res) => {
  const { user, password } = req.body;
  try {
    if (!user || !password) {
      return res.status(404).send("Must complete all fields");
    } else {
      const userFinded = await User.findOne({
        where: {
          user,
        },
      });
      console.log("USUARIO ENCONTRADO:", userFinded);
      if (
        userFinded == null ||
        !(await bcryptjs.compare(password, userFinded.password))
      ) {
        return res.status(404).send("Incorrect username or password");
      } else {
        // console.log("USUARIO ENCONTRADO:", userFinded);
        const id = userFinded.id;
        const token = jwt.sign({ id: id }, "secretKey");
        // console.log("TOKEN: " + token + " para el USUARIO : " + userFinded);
        const cookiesOptions = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookiesOptions);
        // localStorage.setItem("jwt", JSON.stringify(token));
        console.log(token);
        return res.json({ msg: "User successfully logged in", data: token });
        // res.status(200).json({success:true, redirectUrl: '/'})
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    /* VERIFICA EL TOKEN DE LA COOKIE CON EL DEL USUARIO DE LA BASE DE DATOS**/
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        "secretKey"
      );
      console.log(decodificada);
      const compareUser = await User.findAll({
        where: {
          id: [decodificada.id],
        },
      });
      if (!compareUser) {
        return next();
      }
      req.user = compareUser[0];
      next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
    next();
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

//
const sendEmail = async (email) => {
  await transporter.sendMail({
    from: '"HENRY BARBER" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

exports.isAuth = async (req, res) => {
  const token = req.headers["authorization"];

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      // console.log("SOY EL TOKEM", token);
      return res
        .status(403)
        .json({ msg: "no autorizado", holaaaa: `soy yo ${token}` });
    } else {
      console.log("subiendo archivos");

      res.status(200).json({ msg: "exito" });
    }
  });
};
