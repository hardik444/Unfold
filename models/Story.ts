import mongoose, { Document, Model, Schema, models } from "mongoose";

interface Timeline {
  date?: string;
  title?: string;
  description?: string;
}

interface Source {
  name?: string;
  url?: string;
}

interface Video {
  title?: string;
  url?: string;
}

export interface IStory extends Document {
  title: string;
  slug: string;
  summary?: string;
  article?: string;
  category?: string;
  status: string;
  peopleInvolved?: string[];
  tags?: string[];
  isTrendingToday: boolean;
  timeline?: Timeline[];
  sources?: Source[];
  videos?: Video[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TimelineSchema = new Schema<Timeline>({
  date: String,
  title: String,
  description: String,
});

const SourceSchema = new Schema<Source>({
  name: String,
  url: String,
});

const VideoSchema = new Schema<Video>({
  title: String,
  url: String,
});

const StorySchema = new Schema<IStory>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: String,
    article: String,
    category: String,
    status: { type: String, default: "Developing" },
    peopleInvolved: [String],
    tags: [String],
    isTrendingToday: { type: Boolean, default: false },
    timeline: [TimelineSchema],
    sources: [SourceSchema],
    videos: [VideoSchema],
  },
  { timestamps: true }
);

const Story = (models.Story as Model<IStory>) || mongoose.model<IStory>("Story", StorySchema);

export default Story;
