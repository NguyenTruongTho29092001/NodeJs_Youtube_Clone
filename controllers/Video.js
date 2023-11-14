import Video from "../models/Video.js";
import User from "../models/User.js";
//add a video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ UserId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
//get a video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
//update a video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video Not Found" });
    if (req.params.id === req.params.userId) {
      const updateUser = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          $new: true,
        }
      );
      res.status(200).json(updateUser);
    } else {
      return res
        .status(403)
        .json({ message: "You can only update your video" });
    }
  } catch (error) {
    next(error);
  }
};
//delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video Not Found" });
    if (req.user.id === video.UserId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("This video has been delete");
    }
  } catch (error) {
    next(error);
  }
};
//add view
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("this video view has been increased.");
  } catch (error) {
    next(error);
  }
};

//random video
export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
//sub video
export const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subcribedChannels = user.subcribedUsers;
    const list = await Promise.all(
      subcribedChannels.map((channelId) => {
        return Video.find({ UserId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createAt - a.createAt));
  } catch (error) {
    next(error);
  }
};

//trend video
export const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
//getByTags
export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

//search Video
export const searchVideo = async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
