let User = require("../models/user")

var express = require('express');
var router = express.Router();
const CSV = require('csv-string');
const HealthMetric = require("../models/health_metrics");

const REQUIRED_FIELDS = ['id', 'name', 'date', 'steps', 'calories'];

router.use('/save', async (req, res, next) => {
  try {
    if (!req.files) {
      res.send({
        status: 400,
        message: 'no csv file is provided in the request'
      })
    } else {
      let files = req.files;
      let parsedFiles = [];
      for (let key in files) {
        let file = files[key];
        if (file.mimetype !== 'text/csv') {
          res.send({
            status: 415,
            message: 'only csv files are allowed'
          })
        }
        let buffer = file.data;
        let ans = buffer.toString("utf-8");
        const parsedCsv = CSV.parse(ans);
        if (!validateFields(parsedCsv)) {
          res.send({
            status: 400,
            message: 'Required fields are not present in CSV file'
          })
        }
        parsedFiles.push(parsedCsv);
      }
      parsedFiles.forEach(async parsedCsv => { await processMetrics(parsedCsv) });
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
  for (var i = 0; i < headers.length; ++i) {
    if (headers[i] !== REQUIRED_FIELDS[i]) return false;
  }
  return true;
}

const processMetrics = async (csvRecords) => {
  // discard first row as header
  let metrics = []
  for (let i = 1; i < csvRecords.length; i++) {
    let rec = csvRecords[i];
    console.log(rec);
    let user = {};
    user.id = parseInt(rec[0]);
    user.name = rec[1];
    let metric = {};
    metric.userId = user.id;
    metric.date = parseInt(rec[2]);
    metric.steps = parseInt(rec[3]);
    metric.calories = parseInt(rec[4]);

    await User.checkAndSaveUser(user);
    metrics.push(metric);
  }
  await HealthMetric.saveUserMetricInBulk(HealthMetric)
}

router.get("/", async (req, res, next) => {
    User.findAll()
    .then(data => {
      res.send({
        status: 200,
        data: data
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: 500,
        message: 'Internal error occurred'
      })
    })
})

module.exports = router;
