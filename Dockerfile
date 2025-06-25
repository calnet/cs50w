FROM python:3.13.5-alpine3.22

ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt /requirements.txt
COPY ./backend /backend
WORKDIR /backend

RUN python -m venv env /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt

ENV PATH="/py/bin:$PATH"

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]