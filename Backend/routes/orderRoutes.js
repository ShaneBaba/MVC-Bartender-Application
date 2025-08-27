import express from 'express';
import { listOrders, createOrderHandler, markReadyHandler } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', listOrders);            // bartender views queue
router.post('/', createOrderHandler);   // patron places order
router.post('/:id/ready', markReadyHandler); // bartender marks ready

export default router;
