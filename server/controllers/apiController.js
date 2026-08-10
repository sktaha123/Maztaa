export const getWelcomeMessage = (req, res) => {
  res.json({
    message: 'Welcome to the backend API scaffold!',
    version: '1.0.0'
  });
};
