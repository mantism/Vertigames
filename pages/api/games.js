// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import yaml from 'js-yaml';
import fs from 'fs';

let gamesByRound = {};
let doc = undefined;

const loadDoc = () => {
  try {
    doc = yaml.load(fs.readFileSync('./model/challenges.yml',  'utf8'));
  } catch (e) {
    console.log(e);
  }
}

export default function handler(req, res) {
  const round = req.body.round;
  if (!doc) {
    loadDoc();
  }

  res.status(200).json(doc.rounds[`${round}`]);
}
