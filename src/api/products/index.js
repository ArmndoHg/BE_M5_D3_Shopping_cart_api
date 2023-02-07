import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await ProductsModel.create(req.body);
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.findAll({
      attributes: ["firstName", "lasName"],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByPk(req.params.productId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (product) {
      res.send(product);
    } else {
      next(
        createHttpError(404, `User with id ${req.params.productId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const [numberOfUPdatedRows, updatedRecords] = await ProductsModel.update(
      req.body,
      {
        where: { id: req.params.productId },
        returning: true,
      }
    );
    if (numberOfUPdatedRows === 1) {
      res.send(updatedRecords);
    }
    console.log("UPDATE:", response);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
