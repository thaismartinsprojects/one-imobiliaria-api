'use strict';
var PropertySchema, Schema, config, mongoose, setValue;

mongoose = require('mongoose');

Schema = mongoose.Schema;

config = require('../config');

setValue = function(value) {
  var finalValue, newValue;
  newValue = value.toString().replace(/[^0-9]+/g, "");
  finalValue = newValue.toString().slice(0, -2) + '.' + newValue.toString().slice(-2);
  return Number(finalValue);
};

PropertySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    complement: {
      type: String
    },
    neighborhood: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    lat: {
      type: String
    },
    lng: {
      type: String
    }
  },
  floor: {
    type: String
  },
  vacancy: {
    type: Number
  },
  meters: {
    type: Number
  },
  hasSubway: {
    type: Boolean
  },
  subwayStation: {
    type: String
  },
  value: {
    type: Number,
    set: setValue
  },
  condominium: {
    type: Number,
    set: setValue
  },
  iptu: {
    type: Number,
    set: setValue
  },
  location: {
    type: Number,
    set: setValue
  },
  payments: [
    {
      type: String,
      "enum": ['financing', 'money', 'others']
    }
  ],
  exchange: {
    type: Number
  },
  settled: {
    type: Boolean
  },
  difference: {
    type: Number
  },
  car: {
    type: Boolean
  },
  carValue: {
    type: Number
  },
  interest: {
    types: [
      {
        type: String,
        "enum": ['house', 'apartment', 'car', 'others']
      }
    ],
    meters: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    vacancy: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    floor: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    value: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    address: {
      street: {
        type: String
      },
      number: {
        type: String
      },
      complement: {
        type: String
      },
      neighborhood: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      cep: {
        type: String
      }
    },
    condominium: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    iptu: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    location: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    hasSubway: {
      type: Boolean
    },
    subwayStation: {
      type: String
    },
    radius: {
      type: Number
    },
    payments: [
      {
        type: String,
        "enum": ['financing', 'money', 'others']
      }
    ],
    settled: {
      type: Boolean
    }
  },
  created: {
    type: Date
  },
  updated: {
    type: Date,
    "default": Date.now
  }
});

PropertySchema.methods.withoutId = function() {
  var obj;
  obj = this.toObject();
  delete obj._id;
  return obj;
};

PropertySchema.methods.fullAddress = function() {
  var address, obj;
  obj = this.toObject();
  address = obj.address.street + ', ';
  address += obj.address.number + ' - ';
  address += obj.address.neighborhood + ', ';
  address += obj.address.city + ' - ';
  address += obj.address.state + ', ';
  address += obj.address.cep + ', Brazil';
  return address;
};

PropertySchema.methods.forUpdate = function() {
  var item, obj, value;
  obj = this.toObject();
  for (item in obj) {
    value = obj[item];
    if (value === '' || value.length === 0) {
      delete obj[item];
    }
  }
  delete obj._id;
  return obj;
};

module.exports = mongoose.model('Property', PropertySchema);
