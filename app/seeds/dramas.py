from app.models import db, Drama, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_dramas():
    drama1 = Drama(
        user_id=1,
        drama_name="Strong Woman Do Bong Soon",
        drama_image="https://m.media-amazon.com/images/M/MV5BZWUyYmMyMjktMmFjNC00ZGFiLThjODYtNjQ1MzQyODhmZmVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        genre="Crime, Fantasy, Romantic Comedy, Action",
        release_year=2017,
        trailer="https://www.youtube.com/watch?v=ysJzkl-SU1Q&ab_channel=iflixMalaysia",
        description="Do Bong Soon is a petite, unemployed woman who is honest and kind. She appears little and sweet on the outside, but she is in fact very, very strong. For generations in her family, the women have been gifted Herculean strength to use for the greater good. If abused, however, their power will be taken away."
    )
    db.session.add(drama1)

    drama2 = Drama(
        user_id=1,
        drama_name="Weightlifting Fairy Kim Bok Joo",
        drama_image="https://fr.web.img6.acsta.net/pictures/23/01/09/11/39/0276741.jpg",
        genre="Coming-of-age, Romantic Comedy",
        release_year=2016,
        trailer="https://www.youtube.com/watch?v=fMujO0z5npU&ab_channel=AmorDramas",
        description="This series is a coming-of-age story about a group of college athletes who are fighting for their dreams, experiencing and finding love in the process, and growing every step of the way."
    )
    db.session.add(drama2)

    drama3 = Drama(
        user_id=2,
        drama_name="She Was Pretty",
        drama_image="https://thumbor.prod.vidiocdn.com/Mscvko3xGxpSDbI0-GgU1yaw1Wk=/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/831/she-was-pretty-b745ca.jpg",
        genre="Romantic Comedy, Workplace Drama",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=Av_G2B8p6IA&ab_channel=dimsumentertainment",
        description="A romantic comedy, based on a true story, about two past acquaintances who meet again after they've gone through a reversal of fortunes and appearances, set against the backdrop of a fashion magazine's publishing office."
    )
    db.session.add(drama3)

    drama4 = Drama(
        user_id=2,
        drama_name="Reply 1988",
        drama_image="https://i.pinimg.com/474x/10/27/ee/1027ee47ed4d78253bc4e70958b2e942.jpg",
        genre="Coming-of-Age, Family Drama",
        release_year=2015,
        trailer="https://www.youtube.com/watch?v=c-EMf3JdxUA&ab_channel=ViuPhilippines",
        description="Beginning in the year 1988, it revolves around five friends and their families living in the same neighborhood of Ssangmun-dong, Dobong District, Northern Seoul."
    )
    db.session.add(drama4)

    drama5 = Drama(
        user_id=3,
        drama_name="Moon Embracing the Sun",
        drama_image="https://pictures.betaseries.com/fonds/poster/70be8b4f6210e927ebc63951c65599a6.jpg",
        genre="Historical, Fantasy, Romance",
        release_year=2012,
        trailer="https://www.youtube.com/watch?v=z4nP601FRyk&ab_channel=Winterfell-Wolfling",
        description="The historical-fantasy drama is adapted from the novel of the same name written by Jung Eun-gwol. It tells of a poignant love story between a fictional king of the Joseon Dynasty and a female shaman and the conflicts and conspiracy of vying political powers."
    )
    db.session.add(drama5)

    drama6 = Drama(
        user_id=2,
        drama_name="Love in the Moonlight",
        drama_image="https://d3tvwjfge35btc.cloudfront.net/Assets/48/111/L_p0065911148.jpg",
        genre="Historical, Coming-of-Age",
        release_year=2016,
        trailer="https://www.youtube.com/watch?v=-Yfv8T3rChs&ab_channel=ViuPhilippines",
        description="The series is a coming of age story about Crown Prince Lee Yeong's (Park Bo-gum) growth from a boy into revered monarch and his unlikely relationship with eunuch Hong Ra-on (Kim Yoo-jung)."
    )
    db.session.add(drama6)

    db.session.commit()

def undo_dramas():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dramas RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dramas"))

    db.session.commit()
    

    