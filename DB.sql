PGDMP  #    5                }            IS2    16.8    16.8 %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    IS2    DATABASE     h   CREATE DATABASE "IS2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en';
    DROP DATABASE "IS2";
                postgres    false            �            1259    16470    mensajes    TABLE     3  CREATE TABLE public.mensajes (
    id integer NOT NULL,
    contenido text NOT NULL,
    estado public.enum_mensajes_estado DEFAULT 'pendiente'::public.enum_mensajes_estado,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "postulacionId" integer
);
    DROP TABLE public.mensajes;
       public         heap    postgres    false            �            1259    16469    mensajes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.mensajes_id_seq;
       public          postgres    false    222            �           0    0    mensajes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;
          public          postgres    false    221            �            1259    16444    postulaciones    TABLE     >  CREATE TABLE public.postulaciones (
    id integer NOT NULL,
    estado public.enum_postulaciones_estado DEFAULT 'pendiente'::public.enum_postulaciones_estado,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer
);
 !   DROP TABLE public.postulaciones;
       public         heap    postgres    false            �            1259    16443    postulaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.postulaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.postulaciones_id_seq;
       public          postgres    false    220            �           0    0    postulaciones_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.postulaciones_id_seq OWNED BY public.postulaciones.id;
          public          postgres    false    219            �            1259    16422    publicaciones    TABLE     �  CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    estado public.enum_publicaciones_estado DEFAULT 'abierto'::public.enum_publicaciones_estado,
    pago double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer
);
 !   DROP TABLE public.publicaciones;
       public         heap    postgres    false            �            1259    16421    publicaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publicaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.publicaciones_id_seq;
       public          postgres    false    218            �           0    0    publicaciones_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.publicaciones_id_seq OWNED BY public.publicaciones.id;
          public          postgres    false    217            �            1259    16400    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    password character varying(255),
    role character varying(255),
    especialidad character varying(255)
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16399    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    216            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    215            2           2604    16473    mensajes id    DEFAULT     j   ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);
 :   ALTER TABLE public.mensajes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            0           2604    16447    postulaciones id    DEFAULT     t   ALTER TABLE ONLY public.postulaciones ALTER COLUMN id SET DEFAULT nextval('public.postulaciones_id_seq'::regclass);
 ?   ALTER TABLE public.postulaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            .           2604    16425    publicaciones id    DEFAULT     t   ALTER TABLE ONLY public.publicaciones ALTER COLUMN id SET DEFAULT nextval('public.publicaciones_id_seq'::regclass);
 ?   ALTER TABLE public.publicaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            -           2604    16403    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16470    mensajes 
   TABLE DATA           d   COPY public.mensajes (id, contenido, estado, "createdAt", "updatedAt", "postulacionId") FROM stdin;
    public          postgres    false    222   (.       �          0    16444    postulaciones 
   TABLE DATA           k   COPY public.postulaciones (id, estado, "createdAt", "updatedAt", "usuarioId", "publicacionId") FROM stdin;
    public          postgres    false    220   E.       �          0    16422    publicaciones 
   TABLE DATA           u   COPY public.publicaciones (id, titulo, descripcion, estado, pago, "createdAt", "updatedAt", "usuarioId") FROM stdin;
    public          postgres    false    218   D/       �          0    16400    usuarios 
   TABLE DATA           x   COPY public.usuarios (id, nombre, apellido, correo, "createdAt", "updatedAt", password, role, especialidad) FROM stdin;
    public          postgres    false    216   40       �           0    0    mensajes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.mensajes_id_seq', 1, false);
          public          postgres    false    221            �           0    0    postulaciones_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.postulaciones_id_seq', 52, true);
          public          postgres    false    219            �           0    0    publicaciones_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.publicaciones_id_seq', 15, true);
          public          postgres    false    217            �           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 23, true);
          public          postgres    false    215            <           2606    16478    mensajes mensajes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT mensajes_pkey;
       public            postgres    false    222            9           2606    16450     postulaciones postulaciones_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT postulaciones_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT postulaciones_pkey;
       public            postgres    false    220            7           2606    16430     publicaciones publicaciones_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT publicaciones_pkey;
       public            postgres    false    218            5           2606    16407    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    216            :           1259    16484 '   postulaciones_usuario_id_publicacion_id    INDEX     �   CREATE UNIQUE INDEX postulaciones_usuario_id_publicacion_id ON public.postulaciones USING btree ("usuarioId", "publicacionId");
 ;   DROP INDEX public.postulaciones_usuario_id_publicacion_id;
       public            postgres    false    220    220            @           2606    16479 $   mensajes mensajes_postulacionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT "mensajes_postulacionId_fkey" FOREIGN KEY ("postulacionId") REFERENCES public.postulaciones(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT "mensajes_postulacionId_fkey";
       public          postgres    false    220    222    4665            >           2606    16456 .   postulaciones postulaciones_publicacionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT "postulaciones_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Z   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT "postulaciones_publicacionId_fkey";
       public          postgres    false    220    218    4663            ?           2606    16451 *   postulaciones postulaciones_usuarioId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT "postulaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT "postulaciones_usuarioId_fkey";
       public          postgres    false    4661    220    216            =           2606    16431 *   publicaciones publicaciones_usuarioId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT "publicaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT "publicaciones_usuarioId_fkey";
       public          postgres    false    216    218    4661            �      x������ � �      �   �   x�u�Kn�0еy�^ ���,���v�EV=}ev�X�j���h�.����>'!��I�8��K���� EҴD\'&0����1ߟ��S�]�o�B<*��PK::-rF+u+�`�u����������S�	-��0�8�X�A���Ց`i���} ���|}�|w U��P��2pj���t��5�o��鸐�r�1������z,��YՎ�e�} �a��Y�ؑ�cg�TՕ�      �   �   x�m�Kn�0D��)r����u�E��.��N����:��$f���1C���>���y��؃
����=��Ȏ8KJ�ʟ^W��n+�t]7�X�!���ݑ$W0$~��.]����q���T�]w"&UZn"%�����i������ae2ç�7\�BY�\�ߟ���ʳ�/�4bI[�$oh^���m������{R/�Jp��FV�$�����EQ� 1qoz      �   �  x�}�I��@E��+\�������*�(�������!����-NrSwqO�C]ʶ���C�}@��D�� �����6v���>�i�AZ�\L�t��G%k06�"D�ha��OD(��0#ԷA#�r�A� u~ZFd���o���T�DE��KUw�V�0,>�s�g�����
g�����O;�e�&ܔ�τ��%g�Lb�l�A�R��6���/H �y�i���/ #S�1�v����x�O�9	�i$-3H]�=�"Z�қ���)��� %aDcDE� W�:�
0-�%%FO�|i�f��W��� ݈v�wjo�"��Д�U�l�؏�0^$�#�)������ĘJ��A� u~���f�7N��]�:�����N�����en%�!�:ger
m�i�G��4X�#�Pv�5��ο�l�%����H�Vw�R��������Y��X�L�_�{���W�=sJ��6F�Z���(�h���d�X     