import express from 'express';
import { listOrders, createOrderHandler, markReadyHandler } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', listOrders);            
router.post('/', createOrderHandler);   
router.post('/:id/ready', markReadyHandler); 

export default router;
