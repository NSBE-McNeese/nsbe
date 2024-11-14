# Generated by Django 5.0.7 on 2024-09-21 03:46

import django.contrib.auth.models
import django.contrib.auth.validators
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={
                            "unique": "A user with that username already exists."
                        },
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[
                            django.contrib.auth.validators.UnicodeUsernameValidator()
                        ],
                        verbose_name="username",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        blank=True, max_length=254, verbose_name="email address"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                ("mcneese_id", models.CharField(max_length=9, unique=True)),
                (
                    "linkedin",
                    models.URLField(default="http://www.linkedin.com", max_length=50),
                ),
                ("pointsum", models.IntegerField(blank=True, null=True)),
                (
                    "major",
                    models.CharField(
                        choices=[
                            ("Accounting", "Accounting"),
                            ("Agricultural Sciences", "Agricultural Sciences"),
                            ("Art", "Art"),
                            ("Biological Science", "Biological Science"),
                            (
                                "Biology Education Grades 6-12",
                                "Biology Education Grades 6-12",
                            ),
                            ("Business Administration", "Business Administration"),
                            ("Chemical Engineering", "Chemical Engineering"),
                            ("Chemistry", "Chemistry"),
                            ("Computer Science", "Computer Science"),
                            ("Criminal Justice", "Criminal Justice"),
                            (
                                "Early Childhood Education Grades PK-3",
                                "Early Childhood Education Grades PK-3",
                            ),
                            ("Education Grades K-12", "Education Grades K-12"),
                            ("Electrical Engineering", "Electrical Engineering"),
                            (
                                "Elementary Education Grades 1-5",
                                "Elementary Education Grades 1-5",
                            ),
                            ("Engineering", "Engineering"),
                            ("English", "English"),
                            ("Family Science", "Family Science"),
                            ("Finance", "Finance"),
                            ("Food Technology", "Food Technology"),
                            ("General Studies", "General Studies"),
                            (
                                "Health and Physical Education",
                                "Health and Physical Education",
                            ),
                            (
                                "Health and Physical Education Grades K-12",
                                "Health and Physical Education Grades K-12",
                            ),
                            ("Health Systems Management", "Health Systems Management"),
                            ("History", "History"),
                            ("Humanities", "Humanities"),
                            ("Kinesiology", "Kinesiology"),
                            (
                                "Liquefied Natural Gas Business",
                                "Liquefied Natural Gas Business",
                            ),
                            ("Management", "Management"),
                            ("Marketing", "Marketing"),
                            ("Mass Communication", "Mass Communication"),
                            (
                                "Math Education Grades 6-12",
                                "Math Education Grades 6-12",
                            ),
                            ("Mathematical Sciences", "Mathematical Sciences"),
                            ("Mechanical Engineering", "Mechanical Engineering"),
                            (
                                "Medical Laboratory Science",
                                "Medical Laboratory Science",
                            ),
                            (
                                "Middle School Education Grades 4-8 [Mathematics]",
                                "Middle School Education Grades 4-8 [Mathematics]",
                            ),
                            (
                                "Middle School Education Grades 4-8 [Science]",
                                "Middle School Education Grades 4-8 [Science]",
                            ),
                            (
                                "Multiple Levels Grades K-12 [Art]",
                                "Multiple Levels Grades K-12 [Art]",
                            ),
                            (
                                "Multiple Levels Grades K-12 [Music-Instrumental]",
                                "Multiple Levels Grades K-12 [Music-Instrumental]",
                            ),
                            (
                                "Multiple Levels Grades K-12 [Music-Vocal]",
                                "Multiple Levels Grades K-12 [Music-Vocal]",
                            ),
                            ("Music", "Music"),
                            ("Music Education", "Music Education"),
                            (
                                "Natural Resource Conservation Management",
                                "Natural Resource Conservation Management",
                            ),
                            ("Nursing", "Nursing"),
                            ("Nursing LPN to BSN", "Nursing LPN to BSN"),
                            ("Nursing RN to BSN", "Nursing RN to BSN"),
                            ("Nutrition and Dietetics", "Nutrition and Dietetics"),
                            ("Political Science", "Political Science"),
                            ("Pre-Physical Therapy", "Pre-Physical Therapy"),
                            ("Psychology", "Psychology"),
                            ("Radiologic Sciences", "Radiologic Sciences"),
                            (
                                "Radiologic Sciences RT to BS",
                                "Radiologic Sciences RT to BS",
                            ),
                            ("School Librarian", "School Librarian"),
                            (
                                "Secondary Education Grades 6-12 [Agriculture]",
                                "Secondary Education Grades 6-12 [Agriculture]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Biology]",
                                "Secondary Education Grades 6-12 [Biology]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Business]",
                                "Secondary Education Grades 6-12 [Business]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Chemistry]",
                                "Secondary Education Grades 6-12 [Chemistry]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [English]",
                                "Secondary Education Grades 6-12 [English]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Environmental Science]",
                                "Secondary Education Grades 6-12 [Environmental Science]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [General Science]",
                                "Secondary Education Grades 6-12 [General Science]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Mathematics]",
                                "Secondary Education Grades 6-12 [Mathematics]",
                            ),
                            (
                                "Secondary Education Grades 6-12 [Social Studies]",
                                "Secondary Education Grades 6-12 [Social Studies]",
                            ),
                            ("Sociology", "Sociology"),
                            (
                                "Special Education Mild/Moderate for Elementary Education Grades 1-5",
                                "Special Education Mild/Moderate for Elementary Education Grades 1-5",
                            ),
                            ("Sports Medicine", "Sports Medicine"),
                            ("Theatre Arts", "Theatre Arts"),
                            ("Other", "Other"),
                        ],
                        max_length=200,
                    ),
                ),
                (
                    "class_standing",
                    models.CharField(
                        choices=[
                            ("Freshman", "Freshman"),
                            ("Sophomore", "Sophomore"),
                            ("Junior", "Junior"),
                            ("Senior", "Senior"),
                            ("Graduate", "Graduate"),
                        ],
                        default="Freshman",
                        max_length=100,
                    ),
                ),
                (
                    "nationality",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Afghanistan", "Afghanistan"),
                            ("Albania", "Albania"),
                            ("Algeria", "Algeria"),
                            ("Andorra", "Andorra"),
                            ("Angola", "Angola"),
                            ("Antigua and Barbuda", "Antigua and Barbuda"),
                            ("Argentina", "Argentina"),
                            ("Armenia", "Armenia"),
                            ("Australia", "Australia"),
                            ("Austria", "Austria"),
                            ("Azerbaijan", "Azerbaijan"),
                            ("Bahamas", "Bahamas"),
                            ("Bahrain", "Bahrain"),
                            ("Bangladesh", "Bangladesh"),
                            ("Barbados", "Barbados"),
                            ("Belarus", "Belarus"),
                            ("Belgium", "Belgium"),
                            ("Belize", "Belize"),
                            ("Benin", "Benin"),
                            ("Bhutan", "Bhutan"),
                            ("Bolivia", "Bolivia"),
                            ("Bosnia and Herzegovina", "Bosnia and Herzegovina"),
                            ("Botswana", "Botswana"),
                            ("Brazil", "Brazil"),
                            ("Brunei", "Brunei"),
                            ("Bulgaria", "Bulgaria"),
                            ("Burkina Faso", "Burkina Faso"),
                            ("Burundi", "Burundi"),
                            ("Cabo Verde", "Cabo Verde"),
                            ("Cambodia", "Cambodia"),
                            ("Cameroon", "Cameroon"),
                            ("Canada", "Canada"),
                            ("Central African Republic", "Central African Republic"),
                            ("Chad", "Chad"),
                            ("Chile", "Chile"),
                            ("China", "China"),
                            ("Colombia", "Colombia"),
                            ("Comoros", "Comoros"),
                            (
                                "Congo, Democratic Republic of the",
                                "Congo, Democratic Republic of the",
                            ),
                            ("Congo, Republic of the", "Congo, Republic of the"),
                            ("Costa Rica", "Costa Rica"),
                            ("Croatia", "Croatia"),
                            ("Cuba", "Cuba"),
                            ("Cyprus", "Cyprus"),
                            ("Czech Republic", "Czech Republic"),
                            ("Denmark", "Denmark"),
                            ("Djibouti", "Djibouti"),
                            ("Dominica", "Dominica"),
                            ("Dominican Republic", "Dominican Republic"),
                            ("Ecuador", "Ecuador"),
                            ("Egypt", "Egypt"),
                            ("El Salvador", "El Salvador"),
                            ("Equatorial Guinea", "Equatorial Guinea"),
                            ("Eritrea", "Eritrea"),
                            ("Estonia", "Estonia"),
                            ("Eswatini", "Eswatini"),
                            ("Ethiopia", "Ethiopia"),
                            ("Fiji", "Fiji"),
                            ("Finland", "Finland"),
                            ("France", "France"),
                            ("Gabon", "Gabon"),
                            ("Gambia", "Gambia"),
                            ("Georgia", "Georgia"),
                            ("Germany", "Germany"),
                            ("Ghana", "Ghana"),
                            ("Greece", "Greece"),
                            ("Grenada", "Grenada"),
                            ("Guatemala", "Guatemala"),
                            ("Guinea", "Guinea"),
                            ("Guinea-Bissau", "Guinea-Bissau"),
                            ("Guyana", "Guyana"),
                            ("Haiti", "Haiti"),
                            ("Honduras", "Honduras"),
                            ("Hungary", "Hungary"),
                            ("Iceland", "Iceland"),
                            ("India", "India"),
                            ("Indonesia", "Indonesia"),
                            ("Iran", "Iran"),
                            ("Iraq", "Iraq"),
                            ("Ireland", "Ireland"),
                            ("Israel", "Israel"),
                            ("Italy", "Italy"),
                            ("Jamaica", "Jamaica"),
                            ("Japan", "Japan"),
                            ("Jordan", "Jordan"),
                            ("Kazakhstan", "Kazakhstan"),
                            ("Kenya", "Kenya"),
                            ("Kiribati", "Kiribati"),
                            ("Korea, North", "Korea, North"),
                            ("Korea, South", "Korea, South"),
                            ("Kosovo", "Kosovo"),
                            ("Kuwait", "Kuwait"),
                            ("Kyrgyzstan", "Kyrgyzstan"),
                            ("Laos", "Laos"),
                            ("Latvia", "Latvia"),
                            ("Lebanon", "Lebanon"),
                            ("Lesotho", "Lesotho"),
                            ("Liberia", "Liberia"),
                            ("Libya", "Libya"),
                            ("Liechtenstein", "Liechtenstein"),
                            ("Lithuania", "Lithuania"),
                            ("Luxembourg", "Luxembourg"),
                            ("Madagascar", "Madagascar"),
                            ("Malawi", "Malawi"),
                            ("Malaysia", "Malaysia"),
                            ("Maldives", "Maldives"),
                            ("Mali", "Mali"),
                            ("Malta", "Malta"),
                            ("Marshall Islands", "Marshall Islands"),
                            ("Mauritania", "Mauritania"),
                            ("Mauritius", "Mauritius"),
                            ("Mexico", "Mexico"),
                            ("Micronesia", "Micronesia"),
                            ("Moldova", "Moldova"),
                            ("Monaco", "Monaco"),
                            ("Mongolia", "Mongolia"),
                            ("Montenegro", "Montenegro"),
                            ("Morocco", "Morocco"),
                            ("Mozambique", "Mozambique"),
                            ("Myanmar", "Myanmar"),
                            ("Namibia", "Namibia"),
                            ("Nauru", "Nauru"),
                            ("Nepal", "Nepal"),
                            ("Netherlands", "Netherlands"),
                            ("New Zealand", "New Zealand"),
                            ("Nicaragua", "Nicaragua"),
                            ("Niger", "Niger"),
                            ("Nigeria", "Nigeria"),
                            ("North Macedonia", "North Macedonia"),
                            ("Norway", "Norway"),
                            ("Oman", "Oman"),
                            ("Pakistan", "Pakistan"),
                            ("Palau", "Palau"),
                            ("Palestine", "Palestine"),
                            ("Panama", "Panama"),
                            ("Papua New Guinea", "Papua New Guinea"),
                            ("Paraguay", "Paraguay"),
                            ("Peru", "Peru"),
                            ("Philippines", "Philippines"),
                            ("Poland", "Poland"),
                            ("Portugal", "Portugal"),
                            ("Qatar", "Qatar"),
                            ("Romania", "Romania"),
                            ("Russia", "Russia"),
                            ("Rwanda", "Rwanda"),
                            ("Saint Kitts and Nevis", "Saint Kitts and Nevis"),
                            ("Saint Lucia", "Saint Lucia"),
                            (
                                "Saint Vincent and the Grenadines",
                                "Saint Vincent and the Grenadines",
                            ),
                            ("Samoa", "Samoa"),
                            ("San Marino", "San Marino"),
                            ("Sao Tome and Principe", "Sao Tome and Principe"),
                            ("Saudi Arabia", "Saudi Arabia"),
                            ("Senegal", "Senegal"),
                            ("Serbia", "Serbia"),
                            ("Seychelles", "Seychelles"),
                            ("Sierra Leone", "Sierra Leone"),
                            ("Singapore", "Singapore"),
                            ("Slovakia", "Slovakia"),
                            ("Slovenia", "Slovenia"),
                            ("Solomon Islands", "Solomon Islands"),
                            ("Somalia", "Somalia"),
                            ("South Africa", "South Africa"),
                            ("South Sudan", "South Sudan"),
                            ("Spain", "Spain"),
                            ("Sri Lanka", "Sri Lanka"),
                            ("Sudan", "Sudan"),
                            ("Suriname", "Suriname"),
                            ("Sweden", "Sweden"),
                            ("Switzerland", "Switzerland"),
                            ("Syria", "Syria"),
                            ("Taiwan", "Taiwan"),
                            ("Tajikistan", "Tajikistan"),
                            ("Tanzania", "Tanzania"),
                            ("Thailand", "Thailand"),
                            ("Timor-Leste", "Timor-Leste"),
                            ("Togo", "Togo"),
                            ("Tonga", "Tonga"),
                            ("Trinidad and Tobago", "Trinidad and Tobago"),
                            ("Tunisia", "Tunisia"),
                            ("Turkey", "Turkey"),
                            ("Turkmenistan", "Turkmenistan"),
                            ("Tuvalu", "Tuvalu"),
                            ("Uganda", "Uganda"),
                            ("Ukraine", "Ukraine"),
                            ("United Arab Emirates", "United Arab Emirates"),
                            ("United Kingdom", "United Kingdom"),
                            ("United States", "United States"),
                            ("Uruguay", "Uruguay"),
                            ("Uzbekistan", "Uzbekistan"),
                            ("Vanuatu", "Vanuatu"),
                            ("Vatican City", "Vatican City"),
                            ("Venezuela", "Venezuela"),
                            ("Vietnam", "Vietnam"),
                            ("Yemen", "Yemen"),
                            ("Zambia", "Zambia"),
                            ("Zimbabwe", "Zimbabwe"),
                        ],
                        max_length=100,
                        null=True,
                    ),
                ),
                (
                    "race",
                    models.CharField(
                        choices=[
                            (
                                "Black/African-American/Afro-Latinx",
                                "Black/African-American/Afro-Latinx",
                            ),
                            (
                                "Hispanic/Latinx(Non-White)",
                                "Hispanic/Latinx(Non-White)",
                            ),
                            (
                                "Native American/Alaska Native",
                                "Native American/Alaska Native",
                            ),
                            ("Asian/Asian-American", "Asian/Asian-American"),
                            (
                                "White(Non-Hispanic/Latinx)",
                                "White(Non-Hispanic/Latinx)",
                            ),
                            ("Middle-Eastern", "Middle-Eastern"),
                            ("Other", "Other"),
                        ],
                        default=None,
                        max_length=100,
                        null=True,
                    ),
                ),
                (
                    "gender",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Female", "Female"),
                            ("Male", "Male"),
                            ("Non-binary", "Non-binary"),
                        ],
                        max_length=100,
                        null=True,
                    ),
                ),
                ("phone", models.IntegerField(blank=True, null=True)),
                ("birthdate", models.DateField(blank=True, null=True)),
                (
                    "avatar",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="images",
                        verbose_name="Profile Picture",
                    ),
                ),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("slug", models.SlugField(blank=True, max_length=255, unique=True)),
                ("description", models.TextField()),
                ("location", models.CharField(max_length=300)),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("points", models.IntegerField(default=0)),
                (
                    "attendees",
                    models.ManyToManyField(
                        blank=True,
                        related_name="events_attending",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["-start_time"],
            },
        ),
    ]
