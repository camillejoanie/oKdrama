from app.models import db, Actor, environment, SCHEMA
from sqlalchemy import text

def seed_actors():
    actor1 = Actor(
        user_id=1,
        actor_name="Park Hyung-Sik",
        actor_image="https://photos.hancinema.net/photos/photo1585367.jpg",
        debut_year=2010,
        bio="Park Hyung-sik is a South Korean singer and actor born on November 16, 1991. He is known for being a member of the South Korean boy group ZE:A. His acting projects include the television dramas Strong Woman Do Bong-soon and Suits."
    )
    db.session.add(actor1)

    actor2 = Actor(
        user_id=1,
        actor_name="Nam Joo-Hyuk",
        actor_image="https://i.pinimg.com/736x/61/f6/5c/61f65ca5b75a3300bdb9598f8c7e04ff.jpg",
        debut_year=2014,
        bio="Nam Joo-Hyuk is a South Korean model and actor under the agency Management SOOP. He was born in Busan, South Korea."
    )
    db.session.add(actor2)
    
    actor3 = Actor(
        user_id=2,
        actor_name="Park Seo-Joon",
        actor_image="https://i.pinimg.com/564x/0b/97/0b/0b970bce1c1dc5629e783b093b08902b.jpg",
        debut_year=2011,
        bio="Park Seo Joon is a South Korean actor managed by Awesome Entertainment. He completed his military service in 2010 before making his debut in 2011 in Bang Yong Guk's music video 'I Remember.'"
    )
    db.session.add(actor3)
    
    actor4 = Actor(
        user_id=2,
        actor_name="Park Bo-Gum",
        actor_image="https://photos.hancinema.net/photos/photo1679120.jpg",
        debut_year=2011,
        bio="Park Bo Gum is a South Korean actor, singer, and musician currently with THEBLACKLABEL. He had previously been with Blossom Entertainment for ten years."
    )
    db.session.add(actor4)
    
    actor5 = Actor(
        user_id=3,
        actor_name="Kim Soo-Hyun",
        actor_image="https://img.etimg.com/photo/97804886/97804886.jpg",
        debut_year=2007,
        bio="Kim Soo Hyun is a South Korean actor managed by GoldMedalist. He debuted in the drama 'Kimchi Cheese Smile' (김치 치즈 스마일) in 2007."
    )
    db.session.add(actor5)

    actor6 = Actor(
        user_id=1,
        actor_name="Ji Sung",
        actor_image="https://pbs.twimg.com/media/E5Gn8_lXwAgc0_5.jpg",
        debut_year=1999,
        bio="Ji Sung is a South Korean actor known for his versatile roles in various television dramas and films. He has received several awards for his outstanding performances."
    )
    db.session.add(actor6)

    actor7 = Actor(
        user_id=1,
        actor_name="Hyun Bin",
        actor_image="https://i.pinimg.com/736x/b2/fd/37/b2fd37fb7106acb1ffa66aa9a0e0f465.jpg",
        debut_year=2003,
        bio="Hyun Bin is a popular South Korean actor. He gained widespread recognition for his roles in the television dramas 'My Name is Kim Sam-soon' and 'Secret Garden.'"
    )
    db.session.add(actor7)

    actor8 = Actor(
        user_id=2,
        actor_name="Ahn Hyo-seop",
        actor_image="https://img1.kpopmap.com/2020/01/A-photo-of-Ahn-HyoSeop-in-AAA-2019-2.jpg",
        debut_year=2015,
        bio="Ahn Hyo-seop is a South Korean actor, singer, and songwriter. He is known for his roles in the dramas 'Abyss' and 'Thirty But Seventeen.'"
    )
    db.session.add(actor8)

    actor9 = Actor(
        user_id=2,
        actor_name="Joo Sang-wook",
        actor_image="https://koreandrama435792045.files.wordpress.com/2020/03/joo-sang-wook3.png",
        debut_year=1999,
        bio="Joo Sang-wook is a South Korean actor. He has appeared in numerous television dramas and films, showcasing his talent and versatility as an actor."
    )
    db.session.add(actor9)

    actor10 = Actor(
        user_id=3,
        actor_name="Lee Junho",
        actor_image="https://pbs.twimg.com/media/FWj97x-aUAE6XRG.jpg",
        debut_year=2010,
        bio="Lee Junho, often known simply as Junho, is a South Korean singer and actor. He is a member of the boy group 2PM and has also pursued a successful acting career."
    )
    db.session.add(actor10)

    actor11 = Actor(
        user_id=3,
        actor_name="Song Joong-ki",
        actor_image="https://nestia-food-obs-ap-southeast-3.nestia.com/202103/19/59579306e38a40d68bc4ed02268c802d_750x750.jpg",
        debut_year=2008,
        bio="Song Joong-ki is a South Korean actor and a former member of the variety show 'Running Man.' He gained international fame for his role in the hit drama 'Descendants of the Sun.'"
    )
    db.session.add(actor11)

    db.session.commit()

def undo_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actors"))

    db.session.commit()
    