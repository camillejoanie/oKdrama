from app.models import db, DramaActor, environment, SCHEMA
from sqlalchemy import text

def seed_drama_actors():
    drama_actor1 = DramaActor(
        drama_id=1,
        actor_id=1
    )
    db.session.add(drama_actor1)
    
    drama_actor2 = DramaActor(
        drama_id=2,
        actor_id=2
    )
    db.session.add(drama_actor2)
    
    drama_actor3 = DramaActor(
        drama_id=3,
        actor_id=3
    )
    db.session.add(drama_actor3)
    
    drama_actor4 = DramaActor(
        drama_id=4,
        actor_id=4
    )
    db.session.add(drama_actor4)
    
    drama_actor5 = DramaActor(
        drama_id=5,
        actor_id=5
    )
    db.session.add(drama_actor5)
    
    drama_actor6 = DramaActor(
        drama_id=6,
        actor_id=4
    )
    db.session.add(drama_actor6)

    drama_actor7 = DramaActor(
        drama_id=7,
        actor_id=6
    )
    db.session.add(drama_actor7)

    drama_actor8 = DramaActor(
        drama_id=8,
        actor_id=7
    )
    db.session.add(drama_actor8)

    drama_actor9 = DramaActor(
        drama_id=9,
        actor_id=8
    )
    db.session.add(drama_actor9)

    drama_actor10 = DramaActor(
        drama_id=10,
        actor_id=9
    )
    db.session.add(drama_actor10)

    drama_actor11 = DramaActor(
        drama_id=17,
        actor_id=11
    )
    db.session.add(drama_actor11)

    db.session.commit()

def undo_drama_actors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.drama_actors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM drama_actors"))

    db.session.commit()
    