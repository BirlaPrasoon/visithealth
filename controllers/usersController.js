let User = require("../models/user")

var express = require('express');
var router = express.Router();
const CSV = require('csv-string');
const HealthMetric = require("../models/health_metrics");

const REQUIRED_FIELDS = ['id','name','date','steps','calories'];

router.use('/save', async (req, res, next) => {
  try {
    if (!req.files) {
      res.send({
        status: 400,
        message: 'no csv file is provided in the request'
      })
    } else {
      let files = req.files;
      console.log("files",files);
      let parsedFiles = [];
      for(let key in files) {
        let file = files[key];
        if(file.mimetype !== 'text/csv') {
           res.send({
             status: 415,
             message: 'only csv files are allowed'
           })
        }

        console.log("Req", file);
        let buffer = file.data;
        let ans = buffer.toString("utf-8");
        const parsedCsv = CSV.parse(ans);
        if(!validateFields(parsedCsv)) {
          res.send({
            status: 400,
            message: 'Required fields are not present in CSV file'
          })
        }
        parsedFiles.push(parsedFiles);
      }
      parsedFiles.forEach(parsedCsv => await processMetrics(parsedCsv));
      res.send({
        status: 200,
        message: 'Metrics have been saved successfully',
      })
    }
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      message: 'Some internal error occurred'
    })
  }
})

const validateFields = (file) => {
  let headers = file[0];
  if (headers.length !== headers.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (headers[i] !== REQUIRED_FIELDS[i]) return false;
  }
  return true;
}

const processMetrics = async (csvRecords) => {
  // discard first row as header
  let metrics = []
  for (let i = 1; i < csvRecords.length; i++) {
    let rec = csvRecords[i];
    let user = {};
    user.id = parseInt(rec[0]);
    user.name = rec[1];
    let metric = {};
    metric.userId = user.id;
    metric.date = parseInt(rec[2]);
    metric.steps = parseInt(rec[3]);
    metric.calories = parseInt(rec[4]);
    console.log('User', user);
    console.log('Metric', metric);
    await checkAndSaveUser(user);
    metrics.push(metric)
    //  await saveUserMetric(metric);
  }
  await saveUserMetricInBulk(HealthMetric)
}

const checkAndSaveUser = async (user) => {
  const data = await User.findByPk(user.id);
  if (!data) {
    // user does not exist, save it
    await User.create(user);
  }
}

const saveUserMetricInBulk = async (metrics) => {
  await HealthMetric.bulkCreate(metrics, { returning: true })
}

router.get("/", async (req, res, next) => {
  const data = await User.findAll();

  res.send({
    status: 200,
    data: data
  })
})

module.exports = router;
