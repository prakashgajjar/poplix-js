import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const SuggestionSchema = new Schema({
  interview: { type: Schema.Types.ObjectId, ref: "Interview", required: true },
  focusAreas: [{ type: String }],
  improvementTips: [{ type: String }],
}, {
  timestamps: true // optional: adds createdAt and updatedAt
});

const Suggestion = models.Suggestion || model("Suggestion", SuggestionSchema);

export default Suggestion;
