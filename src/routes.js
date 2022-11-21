import express from 'express';
import Eligibility from './modules/Eligibility';


const routes = express.Router();

//ROUTES

routes.get('/oi', (req, res) => {
  res.status(200).send({ status: 'It works' });
});

// Eligibility
routes.post('/lemon', Eligibility.verifyEligibility);




export default routes;
