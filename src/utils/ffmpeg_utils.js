const ffmpeg = require("fluent-ffmpeg");
const config = require(__dirname+"/../../config.json");
const regex = require("../utils/regex_utils");

var ffmpeg_utils = module.exports = {
    encodeVideo: async function(path, size) {
        var filename = regex.getFilenameFromPath(path);
        var output = __dirname + "/../static/videos/" + filename + "-" + size + ".mp4";
        await ffmpeg(path)
        .videoCodec('libx264')
        .size(size)
        .fps(config.app.videos.framerate)
        .output(output)
        .on("start", () => {console.log("Started rendering an ffmpeg video with size: " + size)})
        .on("progress", (progress) => {console.log("Processing: " + progress.percent + "%")})
        .on("error", (error) => {console.log(error.message); return false;})
        .on("end", () => {console.log("The render completed!")})
        .run();
        return output;
    }
}