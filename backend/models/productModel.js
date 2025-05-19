// models/productModel.js
import mongoose from "mongoose";
import pkg from "rrule";
const { RRule, Weekday } = pkg;

const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["product", "event"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dbstbzjue/image/upload/v1745952312/mockup-1_zreinz.png",
    },
    cardSet: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    bookings: {
      type: Array,
      required: true,
      default: [],
      required: function () {
        return this.type === "event";
      },
    },
    maximumEventCapacity: {
      type: Number,
      required: function () {
        return this.type === "event";
      },
    },
    eventLocation: {
      type: String,
      required: function () {
        return this.type === "event";
      },
    },
    startTime: {
      type: Date,
      required: function () {
        return this.type === "event";
      },
    },
    endTime: {
      type: Date,
      required: function () {
        return this.type === "event";
      },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isRecurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    recurringPattern: {
      recurringInterval: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly", "custom"],
      },
      endDate: {
        type: Date,
        required: function () {
          return (
            this.recurringPattern && this.recurringPattern.recurringInterval
          );
        },
      },
      customOccurrenceConfig: {
        dayOfWeek: {
          type: Number,
        },
        weekOfMonth: {
          type: [Number],
        },
      },
    },
    rrule: {
      type: String,
      default: "",
    },
    excludedDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.startTime || !this.endTime) {
    return next();
  }

  //Non-recurring events
  try {
    let ruleOptions = {};

    if (!this.isRecurring) {
      ruleOptions = {
        dtstart: new Date(this.startTime.valueOf()),
        count: 1,
      };
      const rule = new RRule(ruleOptions);
      this.rrule = rule.toString();
      return next();
    }

    if (!this.recurringPattern || !this.recurringPattern.recurringInterval) {
      return next(
        new Error("Event was marked recurring but lacks recurrence details!")
      );
    }

    const { recurringInterval, endDate, customOccurrenceConfig } =
      this.recurringPattern;

    //Process recurring events.
    if (recurringInterval === "custom") {
      const { dayOfWeek, weekOfMonth } = customOccurrenceConfig || {};
      if (dayOfWeek === undefined || !weekOfMonth) {
        return next(new Error(`Day of week undefined! For ${this._id}}`));
      }

      let byweekday = [];
      byweekday = weekOfMonth.map((weekNum) => {
        let nthValue = weekNum === 5 ? -1 : weekNum;
        return new Weekday(dayOfWeek, nthValue);
      });

      ruleOptions = {
        freq: RRule.MONTHLY,
        interval: 1,
        byweekday: byweekday,
        dtstart: new Date(this.startTime.valueOf()),
        until: endDate ? new Date(endDate.valueOf()) : null,
        wkst: RRule.SU,
      };
    } else {
      let rruleFreq;
      switch (recurringInterval) {
        case "daily":
          rruleFreq = RRule.DAILY;
          break;
        case "weekly":
          rruleFreq = RRule.WEEKLY;
          break;
        case "monthly":
          rruleFreq = RRule.MONTHLY;
          break;
        case "yearly":
          rruleFreq = RRule.YEARLY;
          break;
        default:
          return next(new Error(`Invalid frequency: ${recurringInterval}`));
      }

      ruleOptions = {
        freq: rruleFreq,
        interval: 1,
        dtstart: new Date(this.startTime.valueOf()),
        until: endDate ? new Date(endDate.valueOf()) : null,
        wkst: RRule.SU,
      };
    }

    const rule = new RRule(ruleOptions);
    this.rrule = rule.toString();

    next();
  } catch (error) {
    console.error(`Error in product pre save for rrule: ${this._id}, ${error}`);
    return next(error);
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
