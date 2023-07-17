Create database PruebaEntelCristopherNS;

use  PruebaEntelCristopherNS;


-- Creacion de tablas
CREATE TABLE Vendedor
(
    VendedorId INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(50) NOT NULL,
    Apellido NVARCHAR(50) NOT NULL,
	dni NVARCHAR(10) NOT NULL,
	fecha_nacimiento DATE NOT NULL
);

CREATE TABLE MarcaAuto
(
    MarcaId INT PRIMARY KEY IDENTITY,
    Marca NVARCHAR(50) NOT NULL
);

CREATE TABLE ModeloAuto
(
    ModeloId INT PRIMARY KEY IDENTITY,
    Modelo NVARCHAR(50) NOT NULL,
    MarcaId INT FOREIGN KEY REFERENCES MarcaAuto(MarcaId)
);

CREATE TABLE Solicitudes
(
    SolicitudId INT PRIMARY KEY IDENTITY,
    VendedorId INT FOREIGN KEY REFERENCES Vendedor(VendedorId),
    ModeloId INT FOREIGN KEY REFERENCES ModeloAuto(ModeloId),
    FechaSolicitud DATE NOT NULL,
    Precio INT NOT NULL
);

Go

-- insert´s
-- Insert vendedores
INSERT INTO Vendedor (nombre, apellido, fecha_nacimiento, dni) VALUES
('Juan', 'Perez', '2000-03-04', '12345678'),
('Maria', 'Gonzalez', '1982-05-20', '87654321'),
('Pedro', 'Soto', '2003-03-25', '23456789'),
('Ana', 'Castillo', '1960-04-07', '98765432');

-- Insert marcas de autos
INSERT INTO MarcaAuto (marca) VALUES
('Chevrolet'),
('Toyota'),
('Chery'),
('MG'),
('Nissan'),
('Suzuki'),
('Hyundai'),
('Kia');

-- Insertar modelos de autos
INSERT INTO ModeloAuto (Modelo, MarcaId) VALUES
('Sail', 1), ('Tracker', 1),
('Hilux', 2), ('Yaris', 2),
('Tiggo', 3), ('Fulwin', 3),
('ZS', 4), ('3', 4),
('V16', 5), ('Qashqai', 5),
('Swift', 6), ('Baleno', 6),
('Accent', 7), ('Tucson', 7),
('Rio', 8), ('Sportage', 8);

-- Insert solicitudes
INSERT INTO Solicitudes (VendedorId, ModeloId, FechaSolicitud, Precio) VALUES
(1, 1, '2022-01-30', 14232450),
(2, 4, '2023-01-31', 14325560),
(3, 3, '2023-02-03', 21314350),
(4, 4, '2023-02-20', 4354360),
(1, 5, '2023-03-05', 5342566),
(2, 6, '2023-03-20', 6546546),
(3, 7, '2023-03-21', 4655467),
(4, 8, '2023-04-08', 5676578),
(1, 9, '2023-04-10', 5767765),
(2, 10, '2023-04-15', 6576543),
(3, 11, '2023-04-17', 6456567),
(4, 12, '2023-05-12', 6546457),
(1, 13, '2023-05-15', 6544657),
(2, 14, '2023-06-14', 6536345),
(3, 15, '2023-06-20', 6543366),
(4, 16, '2023-06-21', 7654467),
(1, 1, '2023-07-01', 7564657),
(1, 1, '2023-07-02', 7564657),
(1, 1, '2023-07-02', 7564657),
(2, 3, '2023-07-04', 7546757),
(3, 3, '2023-07-05', 7547678),
(4, 4, '2023-07-15', 6754675);

GO

-- Sp´s

-- Marcas mas solicitadas
CREATE PROCEDURE sp_MarcasMasSolicitadas
AS
BEGIN
  SELECT TOP 3 ma.Marca, COUNT(*) AS cantidad_solicitudes
  FROM MarcaAuto ma
  JOIN ModeloAuto mo ON ma.MarcaId = mo.ModeloId
  JOIN Solicitudes s ON mo.ModeloId = s.ModeloId
  GROUP BY ma.Marca
  ORDER BY cantidad_solicitudes DESC
END;

Go

-- Solicitudes del mes actual
CREATE PROCEDURE sp_SolicitudesDelMesActual
AS
BEGIN
  SELECT s.SolicitudId, concat(v.Nombre, ' ',v.Apellido) as Vendedor, mo.Modelo, ma.Marca, s.FechaSolicitud, CONCAT('$', FORMAT(s.Precio, 'N0')) as Total
  FROM Solicitudes s
  JOIN Vendedor v ON s.VendedorId = v.VendedorId
  JOIN ModeloAuto mo ON s.ModeloId = mo.ModeloId
  JOIN MarcaAuto ma ON mo.MarcaId = ma.MarcaId
  WHERE MONTH(s.FechaSolicitud) = MONTH(GETDATE()) AND YEAR(s.FechaSolicitud) = YEAR(GETDATE())
END;

Go

-- Vendedor que menos solicitudes vendio en los ultimos 30 dias

CREATE PROCEDURE sp_VendedorMenosSolicitudes
AS
BEGIN
  SELECT TOP 1 concat(v.Nombre,' ', v.Apellido) as Vendedor, COUNT(*) AS cantidad_solicitudes
  FROM Vendedor v
  JOIN Solicitudes s ON v.VendedorId = s.VendedorId
  WHERE s.FechaSolicitud > DATEADD(Day, -30, GETDATE())
  GROUP BY v.VendedorId, v.Nombre, v.Apellido
  ORDER BY cantidad_solicitudes
END;

Go

-- Modelos sin solicitudes

CREATE PROCEDURE sp_ModelosSinSolicitudes
AS
BEGIN
  SELECT mo.ModeloId, mo.Modelo, ma.Marca
  FROM ModeloAuto mo
  JOIN MarcaAuto ma ON mo.MarcaId = ma.MarcaId
  WHERE NOT EXISTS(SELECT 1 FROM Solicitudes WHERE ModeloId = mo.ModeloId)
END;

GO 

-- 3 Meses con mas dinero en venta de solicitudes

CREATE PROCEDURE sp_TresMesesConMasVentas
AS
BEGIN
  SELECT TOP 3 
    FORMAT(FechaSolicitud, 'MMMM yyyy') AS Mes,
    CONCAT('$', FORMAT(SUM(Precio), 'N0')) AS TotalVentas
  FROM Solicitudes
  GROUP BY FORMAT(FechaSolicitud, 'MMMM yyyy')
  ORDER BY TotalVentas DESC
END;

Go


exec sp_MarcasMasSolicitadas
exec sp_SolicitudesDelMesActual;
exec sp_VendedorMenosSolicitudes;
exec sp_ModelosSinSolicitudes;
exec sp_TresMesesConMasVentas;

