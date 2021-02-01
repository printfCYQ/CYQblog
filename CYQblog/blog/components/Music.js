// import Script from "react-load-script";
// import "../static/style/components/music.css";

// const Music = () => {
//   return (
//     <div className="">
//     <Script url="../static/js/music.js" />
//     111
//       {/* <div className="PlayEy"></div>
//       <div className="Btn"></div>
//       <div className="Play">
//         <audio
//           id="audios"
//           src="http://music.163.com/song/media/outer/url?id=504924216.mp3"
//         ></audio>
//       </div> */}
//     </div>
//   );
// };

// export default Music;
import Script from "react-load-script";
import "../static/style/components/music.css";

const Music = () => {
  return (
    <div className="">
      <Script url="../static/js/music.js" />
      <div className="PlayEy">
        <div className="Btn"></div>
        <div className="Play">
          <audio
            id="audios"
            src="../static/img/bg-music.mp3"
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default Music;
