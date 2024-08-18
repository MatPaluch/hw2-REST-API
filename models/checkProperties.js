const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).unknown(false);

const checkProperties = (obj) => {
  const requiredProps = ["name", "email", "phone"];
  const missingProps = [];

  for (let prop of requiredProps) {
    if (!obj.hasOwnProperty(prop)) {
      missingProps.push(prop);
    }
  }

  return missingProps;
};

const checkUpdateProperties = (body) => {
  const { error, value } = schema.validate(body);

  if (error) {
    const errorMessage = error.details[0].message.replace(/"/g, "'");
    return errorMessage;
  } else {
    return true;
  }
};

module.exports = { checkProperties, checkUpdateProperties };
