const Card = require("./Card");

const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};
const getMyCards = (userId) => {
  return Card.find({ user_id: userId });
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  //normalize card
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};
const addLike = async (cardId, userId) => {
  let card = await Card.findOne({ _id: cardId });

  if (!card) {
    throw new Error("Card not found");
  }

  const isCardLiked = card.likes.find(
    (id) => id.toString() === userId.toString()
  );

  if (!isCardLiked) {
    card.likes.push(userId);
  } else {
    card.likes.pull(userId);
  }
  card = await card.save();
  return card;
};
const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  addLike,
  getMyCards,
};
