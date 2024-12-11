import psycopg

# Menghubungkan ke database dengan psycopg3
conn = psycopg.connect(
    dbname="flask_db",
    host="localhost",
    user="postgres",
    password="Neazeem232",
    port="5432"
)

with conn.cursor() as cur:

    # Menambahkan data ke tabel
    cur.execute('''
        INSERT INTO courses (name, email, password, gender) 
        VALUES 
            ('python', 6500, 45),
            ('java', 7000, 60),
            ('javascript', 6000, 30)
        ON CONFLICT DO NOTHING;
    ''')

# Commit perubahan dan tutup koneksi
conn.commit()
conn.close()
