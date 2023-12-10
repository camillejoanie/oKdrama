from app.models import db, Drama, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_dramas():
    drama1 = Drama(
        user_id=1,
        drama_name="Strong Woman Do Bong Soon",
        drama_image="https://m.media-amazon.com/images/M/MV5BZWUyYmMyMjktMmFjNC00ZGFiLThjODYtNjQ1MzQyODhmZmVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        genre="Crime",
        release_year=2017,
        trailer="https://www.youtube.com/watch?v=ysJzkl-SU1Q&ab_channel=iflixMalaysia",
        description="Do Bong Soon is a petite, unemployed woman who is honest and kind. She appears little and sweet on the outside, but she is in fact very, very strong. For generations in her family, the women have been gifted Herculean strength to use for the greater good. If abused, however, their power will be taken away."
    )
    db.session.add(drama1)

    drama2 = Drama(
        user_id=1,
        drama_name="Weightlifting Fairy Kim Bok Joo",
        drama_image="https://fr.web.img6.acsta.net/pictures/23/01/09/11/39/0276741.jpg",
        genre="Coming-of-age",
        release_year=2016,
        trailer="https://www.youtube.com/watch?v=fMujO0z5npU&ab_channel=AmorDramas",
        description="This series is a coming-of-age story about a group of college athletes who are fighting for their dreams, experiencing and finding love in the process, and growing every step of the way."
    )
    db.session.add(drama2)

    drama3 = Drama(
        user_id=2,
        drama_name="She Was Pretty",
        drama_image="https://thumbor.prod.vidiocdn.com/Mscvko3xGxpSDbI0-GgU1yaw1Wk=/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/831/she-was-pretty-b745ca.jpg",
        genre="Workplace Drama",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=Av_G2B8p6IA&ab_channel=dimsumentertainment",
        description="A romantic comedy, based on a true story, about two past acquaintances who meet again after they've gone through a reversal of fortunes and appearances, set against the backdrop of a fashion magazine's publishing office."
    )
    db.session.add(drama3)

    drama4 = Drama(
        user_id=2,
        drama_name="Reply 1988",
        drama_image="https://i.pinimg.com/474x/10/27/ee/1027ee47ed4d78253bc4e70958b2e942.jpg",
        genre="Coming-of-Age",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=c-EMf3JdxUA&ab_channel=ViuPhilippines",
        description="Beginning in the year 1988, it revolves around five friends and their families living in the same neighborhood of Ssangmun-dong, Dobong District, Northern Seoul."
    )
    db.session.add(drama4)

    drama5 = Drama(
        user_id=3,
        drama_name="Moon Embracing the Sun",
        drama_image="https://pictures.betaseries.com/fonds/poster/70be8b4f6210e927ebc63951c65599a6.jpg",
        genre="Historical",
        release_year=2012,
        trailer="https://www.youtube.com/watch?v=z4nP601FRyk&ab_channel=Winterfell-Wolfling",
        description="The historical-fantasy drama is adapted from the novel of the same name written by Jung Eun-gwol. It tells of a poignant love story between a fictional king of the Joseon Dynasty and a female shaman and the conflicts and conspiracy of vying political powers."
    )
    db.session.add(drama5)

    drama6 = Drama(
        user_id=2,
        drama_name="Love in the Moonlight",
        drama_image="https://d3tvwjfge35btc.cloudfront.net/Assets/48/111/L_p0065911148.jpg",
        genre="Historical",
        release_year=2016,
        trailer="https://www.youtube.com/watch?v=-Yfv8T3rChs&ab_channel=ViuPhilippines",
        description="The series is a coming of age story about Crown Prince Lee Yeong's (Park Bo-gum) growth from a boy into revered monarch and his unlikely relationship with eunuch Hong Ra-on (Kim Yoo-jung)."
    )
    db.session.add(drama6)

    drama7 = Drama(
        user_id=1,
        drama_name="Kill Me Heal Me",
        drama_image="https://upload.wikimedia.org/wikipedia/en/8/8a/KillMeHealMe-Poster.jpg",
        genre="Romantic Comedy",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=jkLlJk2hsoc&ab_channel=DaehanDramaTV",
        description="Cha Do-hyun (Ji Sung) is a third-generation business heir who developed dissociative identity disorder (previously known as multiple personality disorder) in the aftermath of several life-threatening traumatic events. He tries to regain control over his life with the help of Oh Ri-jin (Hwang Jung-eum), a beautiful first-year psychiatric resident who helps him secretly. But Ri-jin's twin brother, Oh Ri-on (Park Seo-joon), is a writer who is determined to uncover the unscrupulous lives of the rich and starts following Do-hyun around."
    )
    db.session.add(drama7)

    drama8 = Drama(
    user_id=1,
    drama_name="Crash Landing on You",
    drama_image="https://m.media-amazon.com/images/M/MV5BMzRiZWUyN2YtNDI4YS00NTg2LTg0OTgtMGI2ZjU4ODQ4Yjk3XkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
    genre="Romantic Comedy",
    release_year=2019,
    trailer="https://www.youtube.com/watch?v=GVQGWgeVc4k&ab_channel=NetflixAsia",
    description="After getting into a paragliding accident, South Korean heiress Yoon Se Ri crash lands in North Korea. There, she meets North Korean army officer Ri Jung Hyuk, who agrees to help her return to South Korea. Despite the tension between their countries, the two of them start falling for one another."
    )
    db.session.add(drama8)

    drama9 = Drama(
        user_id=1,
        drama_name="Business Proposal",
        drama_image="https://m.media-amazon.com/images/M/MV5BNjlhMDc5NDMtZGY2Mi00ZTMxLTk0Y2ItN2VjZDQ1ZmRiZGQ2XkEyXkFqcGdeQXVyMTMzODk3NDU0._V1_FMjpg_UX1000_.jpg",
        genre="Romantic Comedy",
        release_year=2022,
        trailer="https://www.youtube.com/watch?v=mh4R-WXRhQo&ab_channel=NetflixAsia",
        description="Business Proposal tells the story of Shin Ha-ri, an employee who accepts to go on a blind date in place of her friend, but finds out that her date is actually her boss."
    )
    db.session.add(drama9)

    drama10 = Drama(
    user_id=2,
    drama_name="Birth of a Beauty",
    drama_image="https://upload.wikimedia.org/wikipedia/en/c/c6/Birthofabeauty-poster.jpg",
    genre="Melodrama",
    release_year=2014,
    trailer="https://www.youtube.com/watch?v=ekCD5SUuryA&ab_channel=JSWKbleon",
    description="Han Tae Hee is the heir of a large company. He is suffering from broken heart syndrome due to psychological shock. To get the woman he loves back, he completely changes an unattractive and overweight Sa Geum Ran to beautiful Sa Ra. In the process, Han Tae Hee falls for Sa Ra. Besides this, Sa Geum is married to a man, who discredits her and along with his mistress, they pray on her downfall, ultimately getting her killed, or so they thought."
    )
    db.session.add(drama10)

    drama11 = Drama(
    user_id=2,
    drama_name="Rain or Shine",
    drama_image="https://upload.wikimedia.org/wikipedia/en/8/8d/Rain_or_Shine_%28TV_series%29-poster.jpg",
    genre="Melodrama",
    release_year=2017,
    trailer="https://www.youtube.com/watch?v=06_B7Sg8Vd8&ab_channel=iflixMalaysia",
    description="The story of two individuals who lost their loved ones in a tragic accident and try to carry on with their lives as if they are not in pain. Throughout that time, they slowly fall in love."
    )
    db.session.add(drama11)

    drama12 = Drama(
        user_id=3,
        drama_name="Oh My Venus",
        drama_image="https://bestsimilar.com/img/movie/thumb/d1/66313.jpg",
        genre="Romantic Comedy",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=uMtaHlC49jk&ab_channel=KBSWORLDTV",
        description="An out-of-shape lawyer — once known as “Daegu Venus” for her looks — takes steps to regain her figure when she’s dumped by her boyfriend of 15 years. Under the tutelage of a hot-shot celebrity trainer, sweat and sparks begin to fly and she finds herself improving not only her physique, but also her love life."
    )
    db.session.add(drama12)

    drama13 = Drama(
        user_id=3,
        drama_name="Hit the Top",
        drama_image="https://i.mydramalist.com/elgEec.jpg?v=1",
        genre="Coming-of-age",
        release_year=2017,
        trailer="https://www.youtube.com/watch?v=_V8cO0tw4No&ab_channel=KBSWORLDTV",
        description="In the year 1993, pop idol Yoo Hyun-Jae accidentally travels through time to 2017. Discovering that he mysteriously disappears in 1994 and is presumed dead, he begins to investigate into the reason for his disappearance while trying to adjust to life in the future. Meanwhile, Lee Ji-Hoon is an aspiring musician and is secretly enrolled as an idol trainee at Star Punch Entertainment. Ji-hoon struggles to hide this from his parents, who believe he has been studying for his civil service exams."
    )
    db.session.add(drama13)

    drama14 = Drama(
    user_id=2,
    drama_name="The Penthouse: War in Life",
    drama_image="https://upload.wikimedia.org/wikipedia/en/0/09/The_Penthouse_TV_series.jpg",
    genre="Revenge",
    release_year=2020,
    trailer="https://www.youtube.com/watch?v=kjiPsdiHWm0&ab_channel=ViuMalaysia",
    description="The residents of Hera Palace, a luxury penthouse apartment with 100 floors, have many secrets and hidden ambitions. Sim Su Ryeon, who was born into wealth, is the queen of the penthouse apartment. Cheon Seo Jin, the prima donna of the residence, does all she can to give everything to her daughter. Oh Yoon Hee comes from a poor family background, but she strives to enter high society by becoming the queen of the penthouse, the pinnacle of success in her eyes. A battle for wealth, power, and prestige at Seoul’s most coveted penthouse begins."
    )
    db.session.add(drama14)

    drama15 = Drama(
        user_id=1,
        drama_name="Sky Castle",
        drama_image="https://m.media-amazon.com/images/M/MV5BNTQ1YmFmYmEtZjEwZi00NTI1LWJmMzYtY2NiN2YxMDM5NjJmXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg",
        genre="Family",
        release_year=2018,
        trailer="https://www.youtube.com/watch?v=P6coIgyV9e0&ab_channel=NetflixAsia",
        description="Han Seo Jin, Noh Seung Hye, Jin Jin Hee, and Lee Myung Joo all live with their families in SKY Castle, a luxury private neighborhood hosting wealthy doctors and professors. All of the women wish for their children to enter prestigious universities and are actively supporting their education. Following the acceptance of Myung Joo’s son into Seoul National University as a medical student, an incident occurs, resulting in the family quickly moving out. To the surprise of Sky Castle’s residents, Lee Soo Im and her inferior family move in. After interacting with the families there, Soo Im takes it upon herself to help the stressed children by challenging the other women of SKY Castle, meanwhile questioning her ways of supporting her step-son as well. She soon starts to uncover the truth of what happened to Myung Joo's family and their relation to the grade coordinator, Kim Joo Young."
    )
    db.session.add(drama15)

    drama16 = Drama(
    user_id=2,
    drama_name="World of the Married",
    drama_image="https://m.media-amazon.com/images/M/MV5BN2ExY2NkMDAtZGNmMS00YTIwLWI3MmEtNTM2MDM5NTc0ZDk0XkEyXkFqcGdeQXVyNDI3NjU1NzQ@._V1_.jpg",
    genre="Melodrama",
    release_year=2020,
    trailer="https://www.youtube.com/watch?v=e4LUxKEJ9uQ&ab_channel=iflixMalaysia",
    description="Everything seems perfect in the life of the successful family doctor and associate director, Ji Sun Woo. She lives happily in Gosan with her handsome husband Lee Tae Oh, whom she financially helped establish an entertainment company, and their teenage son, Joon Young. However, the perfect image of a happy, loving family life shatters when she discovers that her husband is having an affair, and even their mutual friends are helping him conceal it. Devastated by the betrayal, she sets on a path of seeking revenge and recollecting her broken self."
    )
    db.session.add(drama16)

    drama17 = Drama(
        user_id=1,
        drama_name="Descendants of the Sun",
        drama_image="https://m.media-amazon.com/images/M/MV5BM2ExNGE4ZjItMmY5My00ZDU5LWJiMzMtOTFjMDRmNWVlMzZiXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg",
        genre="Romantic Comedy",
        release_year=2016,
        trailer="https://www.youtube.com/watch?v=wkHjOTFv60g&ab_channel=VikiGlobalTV",
        description="Kang Mo Yeon is a pretty and assertive woman who works as a cardiothoracic surgeon at Haesung Hospital. She isn't afraid to admit her mistakes and believes that capability overrides whatever connections you have. However, she is soon faced with the reality that she cannot advance with just capability. Her life is forever changed when she encounters Yoo Shi Jin, the Captain and team leader of the Alpha Team who cares more about protecting anybody in need of help as well as his country, even if it goes against the order of his superiors. This drama will tell of how they both bond together in a time of war and overcome the odds against them."
    )
    db.session.add(drama17)

    db.session.commit()

def undo_dramas():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dramas RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dramas"))

    db.session.commit()