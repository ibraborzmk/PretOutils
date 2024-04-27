import mysql.connector
from mysql.connector import Error

def update_image_in_annonce(id_annonce, image_path):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='outils_db',
            user='root',
            password='root'
        )

        cursor = connection.cursor()
        with open(image_path, 'rb') as f:
            binary_image = f.read()

        query = """
        UPDATE annonces 
        SET image = %s
        WHERE id = %s
        """

        data = (binary_image, id_annonce)

        cursor.execute(query, data)
        connection.commit()
        print("Image updated successfully.")

    except Error as e:
        print("Error while connecting to MySQL", e)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

# Exemple d'utilisation
update_image_in_annonce(1, '/home/bmk/Documents/techno4/PretOutils/database/ponceuse.jpg')
update_image_in_annonce(2, '/home/bmk/Documents/techno4/PretOutils/database/perceuse.jpg')
update_image_in_annonce(3, '/home/bmk/Documents/techno4/PretOutils/database/scie.jpg')
update_image_in_annonce(4, '/home/bmk/Documents/techno4/PretOutils/database/tondeuse.jpg')
update_image_in_annonce(5, '/home/bmk/Documents/techno4/PretOutils/database/tondeuse.jpg')