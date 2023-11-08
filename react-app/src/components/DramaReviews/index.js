import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
// import CreateReview from "../CreateReview";
import OpenModalButton from "../OpenModalButton";
import "./DramaReviews.css";

function DramaReviews() {
  const { dramaId } = useParams();
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.allReviews);
  const userId = useSelector((state) => state.session.user);
  const owner = useSelector((state) => state.dramas.singleDrama.user_id);
  console.log("hehehee", reviewObj);
  const reviewArr = Object.values(reviewObj);

  let currUser;
  if (userId && userId.id) {
    currUser = userId.id;
  }

  const props = { dramaId, currUser };

  useEffect(() => {
    dispatch(getReviewsThunk(dramaId));
  }, [dispatch, dramaId]);

  const isOwner = owner === currUser;

  return (
    <div className="entire-review-list">
      {userId && isOwner && <></>}
      {userId && currUser && !isOwner && (
        <>
          {!isOwner && (
            // <button className="post-your-review-button">
            //   <OpenModalButton
            //     itemText="Post Your Comment"
            //     modalComponent={<CreateReview props={props} />}
            //   />
            // </button>
            <p>hi</p>
          )}
          {reviewArr.length === 0 && (
            <div className="no-review-text">Be the first to comment! ☺</div>
          )}
          {reviewArr.length > 0 && (
            <div className="drama-reviews-container">
              {reviewArr.map((review) => (
                <div key={review.id} className="review-item">
                  <p>{review.review}</p>
                  <p>Hearts: {review.hearts}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DramaReviews;

{
  /* // import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getReviewsThunk } from "../../store/review";
// // import CreateReview from "../CreateReview";
// // import OpenModalButton from "../OpenModalButton";
// import "./DramaReviews.css";

// function DramaReviews() { */
}
{
  /* //   const { dramaId } = useParams();
//   const dispatch = useDispatch();
//   const reviewObj = useSelector((state) => state.reviews.allReviews);
//   const userId = useSelector((state) => state.session.user);
//   const owner = useSelector((state) => state.dramas.singleDrama.user_id);
//   console.log("HEEEEEEEEEEEEEE", reviewObj);

//   const reviewArr = Object.values(reviewObj);

//   let currUser;
//   if (userId && userId.id) { */
}
{
  /* //     currUser = userId.id;
//   }

//   const props = { dramaId, currUser };

//   useEffect(() => {
//     dispatch(getReviewsThunk(dramaId));
//   }, [dispatch, dramaId]);

//   //   const hasReview = reviewArr.find((review) => {
//   //     return review.user_id === currUser;
//   //   });

//   const isOwner = owner === currUser;

//   return (
//     <div className="entire-review-list">
//       {userId && isOwner && <></>}
//       {userId && currUser && !isOwner && (
//         <>
//           {!isOwner && (
//             <div>HIHIHIHIH</div>
//             // <button className="post-your-review-button">
//             //   <OpenModalButton
//             //     itemText="Post Your Comment"
//             //     // modalComponent={<CreateReview props={props} />}
//             //   />
//             // </button>
//           )}
//           {reviewArr.length === 0 && (
//             <div className="no-review-text">Be the first to comment! ☺</div>
//           )}
//           {reviewArr.length > 0 && (
//             <div className="drama-reviews-container">
//               {reviewArr.map((review) => (
//                 <div key={review.id} className="review-item">
//                   <p>{review.review}</p>
//                   <p>Hearts: {review.hearts}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default DramaReviews; */
}
