FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./backend/requirements.txt .

# Install python dependencies
RUN pip3 install -r requirements.txt --no-cache-dir

# Copy the rest of the project to WORKDIR
COPY ./backend/ .

EXPOSE 8000

# Copy django's static files
RUN python manage.py collectstatic -c --no-input

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
