from app.models import db, Actress, environment, SCHEMA
from sqlalchemy import text

def seed_actresses():
    actress1 = Actress(
        user_id=1,
        actress_name="Han So Hee",
        actress_image="https://m.media-amazon.com/images/M/MV5BNzg1NWE2NzAtNDY2Yi00NWUwLWJlMWYtZWZhYjRmMGYwZDIzXkEyXkFqcGdeQXVyMTI1OTY3MzM3._V1_FMjpg_UX1000_.jpg",
        debut_year=2017,
        bio="Han So-hee, born Lee So-hee on November 18, 1994 in Ulsan, is a South Korean actress. She rose to fame for her role as a young mistress in the top-rating JTBC drama A Couple’s World."
    )
    db.session.add(actress1)

    actress2 = Actress(
        user_id=2,
        actress_name= "Bae Suzy",
        actress_image= "https://koreajoongangdaily.joins.com/data/photo/2022/07/11/c0e273b0-2c08-4a96-8851-8ea0fb02df3d.jpg",
        debut_year= 2010,
        bio= "Suzy, born Bae Su-ji on October 10, 1994, is a South Korean singer and actress. She is a former member of the South Korean girl group Miss A. She is also known for her roles in the television dramas Dream High and While You Were Sleeping.",
    )
    db.session.add(actress2)

    actress3 = Actress(
        user_id=2,
        actress_name= "IU",
        actress_image= "https://m.media-amazon.com/images/M/MV5BNjg5YmFiMDQtNDJlMS00Njg4LWE0YzQtNjEwN2NjZmYyMzY3XkEyXkFqcGdeQXVyMzQ0NTk5NzU@._V1_.jpg",
        debut_year= 2008,
        bio= "IU, born Lee Ji-eun on May 16, 1993, is a South Korean singer-songwriter and actress. She rose to fame for her hit song Good Day. She is also known for her roles in many television dramas such as Dream High and Hotel del Luna.",
    )
    db.session.add(actress3)

    actress4 = Actress(
        user_id=2,
        actress_name= "Park Shin Hye",
        actress_image= "https://i.mydramalist.com/Bdqm71_2f.jpg",
        debut_year= 2001,
        bio= "Park Shin-hye is a South Korean actress born on February 18, 1990. Some of her many popular works are the television dramas Heirs and Pinocchio.",
    )
    db.session.add(actress4)

    actress5 = Actress(
        user_id=3,
        actress_name= "Park Bo Young",
        actress_image= "https://asianwiki.com/images/a/a9/Park_Bo-Young-1990-p1.jpg",
        debut_year= 2006,
        bio= "Park Bo-young is a South Korean actress born on February 12, 1990. She earned widespread praise for her work in the hit movie Scandal Makers. She is also known for her titular character in the television series Strong Woman Do Bong-soon."
    )
    db.session.add(actress5)

    actress6 = Actress(
        user_id=3,
        actress_name= "Lee Min Jung",
        actress_image= "https://asianwiki.com/images/1/12/Lee_Min-Jung-p2.jpg",
        debut_year= 2009,
        bio= 'Lee Min Jeong is a South Korean actress and model under MSteam Entertainment. She is best known for playing the role of Ha Jae Kyung in the popular 2009 idol drama "Boys Over Flowers". Her first TV series lead role was in "Smile, You".',
    )
    db.session.add(actress6)

    actress7 = Actress(
        user_id=2,
        actress_name= "Lee Sung Kyung",
        actress_image= "https://res.heraldm.com/content/image/2018/04/24/20180424000597_0.jpg",
        debut_year= 2008,
        bio= "Lee Sung Kyung is a South Korean actress and model. She began her entertainment career as a model when she competed in the local Super Model Contest in 2008. Lee made her acting debut as the first actress from YG Entertainment and model company K-Plus's strategic partnership in the SBS drama ''It's Okay, That's Love'' (괜찮아, 사랑이야, 2014). Her first leading role as the titular character in 'Weightlifting Fairy Kim Bok Joo.'",
    )
    db.session.add(actress7)

    actress8 = Actress(
        user_id=2,
        actress_name= "Kim Tae Hee",
        actress_image= "https://upload.wikimedia.org/wikipedia/commons/8/85/LG_%EC%98%B5%ED%8B%B0%EB%A8%B8%EC%8A%A4_3D_%26_LG_%EC%8B%9C%EB%84%A4%EB%A7%88_3D_TV_CF_%EC%B4%AC%EC%98%81_%EC%82%AC%EC%A7%84_%28cropped%29.jpg",
        debut_year= 2000,
        bio= "Kim Tae Hee is a South Korean actress and model under BS Company (Korea). She began her career as a model and in television commercials, and she made her film debut in 'Last Present'. Kim is best known for her roles in Korean dramas such as 'Iris', 'Love Story in Harvard', 'My Princess', and 'Stairway to Heaven'. She rose to stardom via her portrayal of the evil stepsister in the popular SBS TV series 'Stairway to Heaven'.",
    )
    db.session.add(actress8)

    actress9 = Actress(
        user_id=3,
        actress_name= "Hwang Jung Eum",
        actress_image= "https://blog.asianwiki.com/wp-content/uploads/2016/01/Hwang-Jung-Eum.jpeg",
        debut_year= 2004,
        bio= "Hwang Jung Eum is a South Korean actress and singer represented by C-JeS Entertainment. Being a former member of the K-pop group Sugar, she left the group in 2004 to pursue a solo career. Hwang appeared as one of the recurring guests of the variety show 'Love Letter' from 2004 to 2006, in which her onscreen pairing with Kim Jong-min became popular. She officially made her acting debut in the 2007 television drama 'The Person I Love'.",
    )
    db.session.add(actress9)

    db.session.commit()

def undo_actresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actresses"))

    db.session.commit()
