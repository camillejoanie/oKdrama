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

    db.session.commit()

def undo_actresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.actresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM actresses"))

    db.session.commit()
