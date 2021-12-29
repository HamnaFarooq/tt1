const express = require("express");
const router = express.Router();
// const { check, validationResult } = require('express-validator/check');
const config = require("config");
const auth = require("../../middleware/auth");
const nodemailer = require("nodemailer");
const Project = require("../../models/Projects");
const User = require("../../models/User");
const mongoose = require("mongoose");

/* ROUTES THAT ARE COMPLETED:
A) CREATE PROJECT
B) DELETE TASK
C) DELETE PROJECT
D) DELETE TASK
E) EDIT TASK
F) GET ALL TASKS */

// @route POST api/projects/create
// @desc  Create new project
// @access Private

router.post("/", auth, async (req, res) => {
  // const user = await User.findOne({ user: req.user.id })
  const user = await User.findById(req.user.id);
  // console.log("user is ", user)
  // console.log("asfafna ", req.body);
  if (user) {
    try {
      if (req.body.comments) {
        if (req.body.comments.length > 0) {
          var project = await new Project({
            name: req.body.name,
            tasks: req.body.tasks,
            priority: req.body.priority,
            comments: {
              _id: mongoose.Types.ObjectId(req.user.id),
              text: req.body.comments[0].text,
            },
          }).save();
        }
      } else {
        var project = await new Project({
          name: req.body.name,
          tasks: req.body.tasks,
          // comments: { _id: mongoose.Types.ObjectId(req.user.id), text: req.body.comments[0].text }
        }).save();
      }

      if (project) {
        // await User.findByIdAndUpdate({ user: req.user.id }, { $push: { projects: project._id } })
        await user.projects.unshift(project._id);
        await user.save();
      }
      // if (req.body.comments.length > 0) {
      //     // console.log(req.body.comments[0].text);
      //     res.json(req.body.comments[0].text)
      // }
      // else {
      //     res.json({ msg: "no comment" })
      // }
      res.json({ project });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
});

// @route POST api/projects/delete:id
// @desc  delete project by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findOne({ user: req.user.id });

    if (!project) {
      return res.json({ msg: "Post not found" });
    }

    // const removeIndex = user.projects.map(project => project._id.toString()).indexOf(req.params.id);
    // console.log(removeIndex)
    if (
      user.projects.filter(
        (project) => project._id.toString() === req.params.id
      ).length > 0
    ) {
      user.projects.map((project, index) => {
        // console.log("index is: ", index);
        if (project._id.toString() === req.params.id) {
          // console.log("index matched at: ", index);
          user.projects.splice(index, 1);
        }
      });
      // console.log(removeIndex)
    }
    await project.remove();
    await user.save();
    await project.save();
    return res.json(req.params.id);
    // user.projects.map(project => console.log('\n', project._id.toString(), '\n'))
    // console.log(req.params.id)
    //user.projects.splice(removeIndex, 1);
    //await user.save();

    //res.json(user.projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/:id
// @desc  add a new task to a project
// @access Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.find({ user: req.user.id });
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.json({ msg: "project does not exist" });
    }

    // await Project.findByIdAndUpdate(req.user.id , { $push: { tasks: req.body.tasks } })
    // project.updateOne({ $push: { tasks: req.body.tasks } });
    //project.tasks.unshift(req.body.tasks);

    // let newProject = await Project.updateOne(
    //     { _id: req.params.id },
    //     { $push: { tasks: req.body.tasks } }, { new: true }
    // );

    // let newProject = await Project.findOneAndUpdate({ _id: req.params.id }, { $push: { tasks: req.body.tasks } } );
    let newProject = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { tasks: req.body.tasks } },
      { new: true }
    );

    let newestproject = await Project.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          alteration: {
            user: mongoose.Types.ObjectId(req.user.id),
            editType: req.body.editType,
            documentRef: mongoose.Types.ObjectId(
              newProject.tasks[newProject.tasks.length - 1]._id
            ),
          },
        },
      },
      { new: true }
    );
    // console.log(`\n\nprojectd return: ${newestproject}\n\n`);

    // await project.save();

    res.json({ newestproject });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/:project_id/:task_id
// @desc  alter/edit an existing task
// @access Private
router.patch("/:project_id/:task_id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);
    const taskArr = project.tasks;

    const commentsArr = req.body.comments.map((cmnt) => ({
      ...cmnt,
      user: mongoose.Types.ObjectId(req.user.id),
    }));
    console.log(commentsArr);

    let index = taskArr.findIndex(
      (task) => task._id.toString() === req.params.task_id
    );

    if (index > -1) {
      taskArr[index] = {
        _id: mongoose.Types.ObjectId(req.params.task_id),
        name: req.body.task.name,
        description: req.body.task.description,
        startDate: req.body.task.startDate,
        endDate: req.body.task.endDate,
      };

      console.log("if running");
      var pr = await Project.findOneAndUpdate(
        { _id: req.params.project_id },
        {
          name: req.body.name,
          comments: commentsArr,
          tasks: taskArr,
          $push: {
            alteration: {
              user: mongoose.Types.ObjectId(req.user.id),
              editType: req.body.editType,
              documentRef: mongoose.Types.ObjectId(req.params.task_id),
            },
          },
        },
        { new: true }
      );
    }
    // console.log("---------------->>", req.body.task)
    // console.log("\n\n---------------->>", pr)

    res.json(pr);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/
// @desc  Get all projects of user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    console.log("userProjects", user.projects);

    const ids = user.projects;

    const projects = await Project.find().where("_id").in(ids).exec();

    if (!projects) {
      return res.json({ msg: "no projects of this user" });
    }

    res.json({ projects });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/:project_id/:task_id
// @desc  Delete a task in a project
// @access Private
router.delete("/:project_id/:task_id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);
    const taskArr = project.tasks;

    let index = taskArr.findIndex(
      (task) => task._id.toString() === req.params.task_id
    );

    if (index > -1) {
      taskArr.splice(index, 1);
      await Project.updateOne(
        { _id: req.params.project_id },
        { tasks: taskArr }
      );
    }
    const { project_id, task_id } = req.params;
    res.json({ project_id, task_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/projects/:project_id/
// @desc  get all users who comment on selected project
// @access Private
router.get("/:project_id/", auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.project_id });
    console.log("project", project);

    let ids = [];
    var projects;

    project.comments.map((comment, index) => ids.push(comment.user._id));

    users = await User.find().where("_id").in(ids).exec();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/single_project/:project_id/", async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.project_id });
    console.log("project123", project);

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/projects/share
// @desc  share project with user via email
// @access Private
router.post("/share/:project_id", auth, async (req, res) => {
  try {
    let data = req.body.userData;
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.json({ msg: "user does not exist" });
    }

    const project = await Project.findOne({ _id: req.params.project_id });
    let sharedObj = {
      user: user._id,
      editType: data.shareType,
    };
    await project.alteration.unshift(sharedObj);
    await project.save();
    await user.projects.unshift(project._id);

    await user.save();
    let emailContext = {
      email: data.email,
      project: `${
        data.senderData.name +
        " shared " +
        data.projectName +
        " project with you his/her email address is " +
        data.senderData.email +
        " and you can " +
        data.shareType +
        " it and link is  " +
        "http://localhost:3000/" +
        req.params.project_id +
        "/" +
        data.shareType
      }`,
    };
    sendEmail(emailContext);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/:project_id/
// @desc  Duplicate a task in a project
// @access Private
router.post("/:id/", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.json({ msg: "project does not exist" });
    }

    let newProject = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { tasks: req.body.task } },
      { new: true }
    );

    res.json(newProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/projects/priority/:id/
// @desc  Change project priority
// @access Private
router.post("/priority/:id/", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.json({ msg: "project does not exist" });
    }

    let newProject = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { priority: req.body.priority },
      { new: true }
    );

    res.json(newProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const sendEmail = (senderData) => {
  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSL,
    // you can try with TLS, but port is then 587
    auth: {
      user: "taskview1122@gmail.com", // Your email id
      pass: "Task@123", // Your password
    },
  };

  var transporter = nodemailer.createTransport(smtpConfig);
  // replace hardcoded options with data passed (somedata)
  var mailOptions = {
    from: "taskview1122@gmail.com", // sender address
    to: senderData.email, // list of receivers
    subject: "Project share in Task view", // Subject line
    text: "", //, // plaintext body
    html: `<b>${senderData.project} ✔</b>`, // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Message failed: ", error);
      return false;
    } else {
      console.log("Message sent: " + info.response);
      return true;
    }
  });
};

module.exports = router;
